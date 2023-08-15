---
layout: post
title: "UWP에서 가상 키보드 만들기"
excerpt: "UWP에서 가상 키보드를 만드는 방법"
tags: [UWP, C#, Virtual Keyboard]
author: devwock
comments: true
---

# UWP에서 가상 키보드 만들기

UWP의 inputInjectionBrokered를 사용하면 키보드, 마우스, 게임패드 입력을 시뮬레이트 할 수 있다. 이 경우 물리적 입력과 동일한 입력으로 취급된다.
단, inputInjectionBrokered는 [일반적으로 스토어 앱으로 허용을 해주지 않기 때문에(링크 Important 참조)](https://docs.microsoft.com/en-us/windows/uwp/packaging/app-capability-declarations#restricted-capabilities) 사이드 로딩 앱으로만 사용할 수 있다.

```txt
Package.appxmanifest
```

Package에 다음 항목 추가

```xml
xmlns:rescap="http://schemas.microsoft.com/appx/manifest/foundation/windows10/restrictedcapabilities"

IgnorableNamespaces="uap mp rescap"
```

Capabilities에 다음 항목 추가

```xml
<rescap:Capability Name="inputInjectionBrokered" />
```

전체 소스코드:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Package xmlns="http://schemas.microsoft.com/appx/manifest/foundation/windows10" xmlns:mp="http://schemas.microsoft.com/appx/2014/phone/manifest" xmlns:uap="http://schemas.microsoft.com/appx/manifest/uap/windows10" xmlns:rescap="http://schemas.microsoft.com/appx/manifest/foundation/windows10/restrictedcapabilities" IgnorableNamespaces="uap mp rescap">
  ...
  <Capabilities>
  ...
    <rescap:Capability Name="inputInjectionBrokered" />
  </Capabilities>
</Package>
```

```C#
using System;
using System.Collections.Generic;
using Windows.UI.Input.Preview.Injection;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;

namespace VirtualKeyboard
{
    public sealed partial class VKeyboard : UserControl
    {
        private InputInjector inputInjector { get; set; }

        public VKeyboard()
        {
            this.InitializeComponent();
            inputInjector = InputInjector.TryCreate();
            DashKey.IsEng = false;
            ReleaseShift();
            Unloaded += VKeyboard_Unloaded;
            // IT IS BECAUSE UWP BUG!!!!! CHECK THIS https://social.msdn.microsoft.com/Forums/sqlserver/en-US/197c18fd-f9a6-4c65-9b63-20207ae0174b/uwpcannot-assign-to-nullable-type-property-in-xaml?forum=wpdevelop
        }

        private const string KOREAN = "Kore";
        private const string ENGLISH = "Latn";

        private void ChangeToHangul()
        {
            inputInjector.InjectKeyboardInput(new[] { GetKeyInfo("Hangul") });
        }

        private void VKeyboard_Unloaded(object sender, RoutedEventArgs e)
        {
            ReleaseShift();
        }

        private void CloseButton_Click(object sender, RoutedEventArgs e)
        {
            TouchMessenger.VKeyboardHide();
        }

        private void VKey_KeyPress(object sender, RoutedEventArgs e)
        {
            var coreTextService = Windows.UI.Text.Core.CoreTextServicesManager.GetForCurrentView().InputLanguage;
            if ((HanKey.IsChecked == false && !KOREAN.Equals(coreTextService.Script)) || (HanKey.IsChecked == true && !ENGLISH.Equals(coreTextService.Script)))
            {
                ChangeToHangul();
            }

            VKey key = sender as VKey;
            List<InjectedInputKeyboardInfo> infos = new List<InjectedInputKeyboardInfo>();

            if (ShiftKey.IsChecked == true)
            {
                infos.Add(GetKeyInfo("Shift"));
            }

            infos.Add(GetKeyInfo(key.KeyValue));
            inputInjector.InjectKeyboardInput(infos);

            ReleaseShift();
        }

        private void ReleaseShift()
        {
            var shiftUpInfo = GetKeyInfo("Shift");
            shiftUpInfo.KeyOptions = InjectedInputKeyOptions.KeyUp;
            inputInjector.InjectKeyboardInput(new[] { shiftUpInfo });
        }

        private void VFuncKey_Press(object sender, RoutedEventArgs e)
        {
            VKey key = sender as VKey;
            inputInjector.InjectKeyboardInput(new[] { GetKeyInfo("1") });
            inputInjector.InjectKeyboardInput(new[] { GetUnicodeKeyInfo(key.DisplayKey[0]) });
        }

        private void HanKey_Checked(object sender, RoutedEventArgs e)
        {
            ChangeToHangul();
        }

        private void NumKey_Click(object sender, RoutedEventArgs e)
        {
            RepeatButton key = sender as RepeatButton;
            string keyValue = key.Tag as string;
            inputInjector.InjectKeyboardInput(new[] { GetKeyInfo("1") });
            inputInjector.InjectKeyboardInput(new[] { GetUnicodeKeyInfo(keyValue[0]) });
        }

        private void FunctionRepeatKey_Click(object sender, RoutedEventArgs e)
        {
            RepeatButton key = sender as RepeatButton;
            var cont = key.Content as Grid;
            var keyValue = cont.Tag as string;
            inputInjector.InjectKeyboardInput(new[] { GetKeyInfo(keyValue) });
        }

        private InjectedInputKeyboardInfo GetKeyInfo(string keyValue)
        {
            InjectedInputKeyboardInfo virtualKeyboardInfo = new InjectedInputKeyboardInfo();
            virtualKeyboardInfo.VirtualKey = (ushort)((Windows.System.VirtualKey)Enum.Parse(typeof(Windows.System.VirtualKey), keyValue, true));
            return virtualKeyboardInfo;
        }

        private InjectedInputKeyboardInfo GetUnicodeKeyInfo(char keyValue)
        {
            InjectedInputKeyboardInfo virtualKeyboardInfo = new InjectedInputKeyboardInfo();
            virtualKeyboardInfo.KeyOptions = InjectedInputKeyOptions.Unicode;
            virtualKeyboardInfo.ScanCode = keyValue;
            return virtualKeyboardInfo;
        }
    }
}
```

# Reference

1) [Input injector](https://docs.microsoft.com/en-us/uwp/api/windows.ui.input.preview.injection.inputinjector)
2) [App capability declarations - Restricted capabilities](https://docs.microsoft.com/en-us/windows/uwp/packaging/app-capability-declarations#restricted-capabilities)
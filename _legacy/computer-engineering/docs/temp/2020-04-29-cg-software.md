## 컴퓨터 그래픽스 소프트웨어

## 컴퓨터 그래픽스 영상의 표현

### 래스터 그래픽스 영상

#### 개요

* 래스터: CRT의 래스터 주사 방식에서 사용된 용어
* 사각형 격자 좌표 형태의 픽셀 배열로 표현됨
* 디지털 카메라, 스캐너 등을 통해 입력한 영상, 영상 편집기를 이용하여 만든 영상
* TIFF, BMP, PNG, JPEG 등의 파일 형식으로 저장

#### 특성

* 색 표현의 정밀도: 각 픽셀당 색을 표현하는데 사용되는 비트 수에 의해 결정됨
* 영상의 크기: 영상의 가로 픽셀 x 세로 픽셀 수로 표현
  * 영상을 저장하기 위한 메모리 양은 영상의 크기 및 색 표현의 정밀도에 의해 결정됨
  * 그림을 확대해도 더 세밀한 그림을 얻을 수는 없음

### 벡터 그래픽스 영상

#### 개요

* 벡터: 크기와 방향을 동시에 나타내는 값
* 벡터 그래픽스: 수학 방정식을 기반으로 점, 직선, 곡선, 다각형을 표현하는 방법
* 일러스트, 코렐드로우 등의 그래픽스 에디터로 제작
* 맥스, 마야 등 3차원 그래픽스 패키지에서도 벡터 방식으로 물체를 설계함
* SVG, PDF, EPS, WMF, DXF 등의 파일 형식

#### 특성

* 영상을 저장하는데 필요한 메모리 양은 영상의 크기가 아니라 영상에 들어있는 그래픽스 기본 요소의 수에 의해 결정됨
* 렌더링을 통해 래스터 영상을 만들어 디스플레이 함
* 영상을 확대해도 화질이 떨어지지 않으며, 자연스럽게 형체를 유지하며 확대됨
* 사진과 같은 영상을 표현하기에는 적절하지 않음

## 그래픽스 소프트웨어의 유형

### 컴퓨터 그래픽스 패키지

#### 종류

* 특수목적 패키지
  * 응용분야에 맞는 그림을 생성하기 위한 그래픽스 패키지
  * CAD 패키지: 건축, 기계, 전자 회로 등의 제품 설계
  * 페인트 패키지: 래스터 그림이나 사진 등을 제작하거나 편집
  * 3차원 모델링 및 애니메이션: 맥스, 마야, 유니티 등
* 범용 그래픽스 API
  * 전문 프로그래머가 C/C++, JAVA 등의 프로그래밍 언어에서 사용할 수 있는 그래픽스 라이브러리
  * 장면 설계 및 렌더링을 위한 최적화된 함수를 제공함

#### 그래픽스 API의 역할

#### 범용 그래픽스 API의 유형

* 저수준 그래픽스 API
  * 그래픽 기본요소 및 그 속성 지정, 기하 변환, 뷰잉 등 장면을 정의하여 컴퓨터 화면에 표시하는 일련의 과정을 지시하는 함수들을 제공
  * 프로그래머는 이 함수들을 이용하여 장면을 구성하고, 이를 화면에 그리기 위한 세부적인 처리 과정을 하나하나 프로그램으로 작성
  * GL, OpenGL, Direct3D 등
* 고수준 그래픽스 API
  * 장면 묘사를 위주로 하는 기능을 제공
  * 다양한 모형(큐브, 다각형, 재질, 카메라, 광원 등)을 제공
    * 기존 모형을 새로운 모형으로 쉽게 변혈할 수 있게 함
  * 모형들로 구성된 객체들을 계층적으로 조직화하여 장면을 구성함
  * 고수준 그래픽스 API의 예
    * Open Inventor: OpenGL에 기반을 둔 객체지향 3D 그래픽스 API
    * VRML (VR Modeling Language)
    * Java 3D

### OpenGL 프로그래밍

#### 개요

* SGI의 그래픽 워크스테이션에 IRIS GL이라는 그래픽스 API를 제공
* GL을 다양한 워크스테이션에서 활용할 수 있도록 하드웨어에 독립적인 버전의 OpenGL을 개발
  * SGI, DEC, IBM, Apple, MS, Nvidia 등과 함께 OpenGL 아키텍쳐 리뷰 보드(ARB)를 구성하여 OpenGL을 유지관리
  * 2006년부터 크로노스 그룹에서 관리
* 저수준 절차적 API

* OpenGL의 진화
  * 그래픽스 하드웨어 발전에 맞추어 새로운 버전으로 진화
    * 1.0: 고정 기능 그래픽스 파이프라인
      * 고정 기능 파이프라인: 응용프로그램이 설정할 수 있는 고정된 개수의 파라미터에 의해 제어되는 동작을 하는 처리 단계로 구성되는 그래픽 파이프라인의 버전
    * 2.0: GLSL(OpenGL Shading Language)
      * 프로그램 기능 파이프라인
        * 꼭짓점, 프래그먼트의 처리 및 이들과 관련된 데이터(ex: 텍스쳐 좌표)가 셰이드 프로그램에 의해 제어되는 동작 모드
        * GLSL: 셰이더 프로그래밍을 위한 C스타일의 문장으로 표현되는 언어
    * 3.0: 디프리케이션 모델 도입
    * 4.0: 두 단계의 새로운 테셀레이션 셰이더 추가
    * 4.6

#### OpenGL의 라이브러리

* 코어 프로파일
  * 셰이더 프로그램의 준비
  * 셰이더가 사용할 라이브러리의 준비
    * 2, 3차원 기하학적 구조, 텍스쳐 이미지 등
  * 여러가지 OpenGL 상태 설정, 기하학적 구조의 그리기 지시 명령 등
* 컴패터빌리티 프로파일:
  * 구 버전과의 호환성을 위해 제공되는 기능을 포함

* 확장기능
  * OpenGL은 하드웨어 발전에 맞추어 진화하는 API임
    * 하드웨어 공급 업체에서 확장 기능을 제공
      * 다수의 공급자의 동의 하에 구현 - EXT
      * ARB의 승인 - ARB
      * 새로운 버전의 OpenGL에 수용
  * OpenGL의 확장 기능을 관리하는 라이브러리 활용
    * GLEW(OpenGL Extension Wrangler)
    * GLEE(OpenGL Easy Extension)

* 윈도 입출력을 위한 라이브러리
  * OpenGL은 장치 독립적인 라이브러리
    * 특정 윈도 시스템을 위한 기능은 해당 윈도 시스템을 위한 라이브러리가 필요함
      * Windows: WGL 인터페이스 루틴 사용
      * X: GLX 루틴
      * 애플: AGL
    * 윈도 시스템에 의존적임

* 윈도 시스템 독립적 인터페이스 라이브러리
  * GLUT(OpenGL Utility Toolkit) 라이브러리
    * 함수에는 'glut'라는 접두사를 사용
    * 현재는 더이상 유지보수가 제공되지 않음
  * freeglut 라이브러리
    * glut를 대신할 수 있는 라이브러리
    * greeglut32.lib 라이브러리 파일 및 freeglut.h 헤더파일을 사용

#### OpenGL의 자료형

| OpenGL 자료형 | C/C++ 자료형 | 접미사 |
| :-- | :-- | :-- |
| GLbyte | 8비트 정수 | b |
| GLshort | 16비트 정수 | s |
| GLint, GLsizei | 32비트 정수 | i |
| GLfloat, GLclampf | 32비트 실수 | f |
| GLdouble, GLclampd | 64비트 정수 | d |
| GLubyte, GLboolean | 8비트 부호 없는 정수 | ub |
| GLushort | 16비트 부호 없는 정수 | us |
| GLuint, GLenum, GLbitfield | 32비트 부호 없는 정수 | ui |

#### OpenGL의 함수 이름 형식

```opengl
return_type <lib_prefix>FunctionName<arg_count><arg_type>{v}
                            (<arguments>);
```

* `<lib_prefix>`: 함수 접두사
* `<arg_count>`: 함수가 갖는 인수의 수
* `<arg_type>`: 인수의 데이터 형
* `{v}`: 인수가 벡터인 경우 첨가

```opengl
void glUniform2f(GLint location, GLfloat v0, GLfloat v1);
```

* gl: OpenGL Core 라이브러리
* 2f: 데이터 매개변수가 2개, 형식은 float

#### 셰이더

* 파이프라인
  * Vertex Puller: 꼭지점 전달
  * Vertex Shader(필수): 꼭지점 셰이더
  * Tessellation Control Shader: 테셀레이션 제어 셰이더
  * Tessellation Primitive Gen: 테셀레이션 기본 요소 발생기
  * Tessellation Evaluation Shader: 테셀레이션 계산 셰이더
  * Geometry Shader: 기하 구조 셰이더
  * Rasterization: 래스터화
  * Fragment Shader(필수): 하나하나 점들에 대한 데이터
    * Fragment: 하나의 픽셀 + 픽셀 처리 부가정보

* GLSL
  * OpenGL ARB가 셰이더 프로그램 작성용 언어로 만든 C언어 형태의 프로그래밍 언어
  * OpenGL 그래픽스 파이프라인 중 프로그램 가능 단계를 수행하는 셰이더 프로그램을 작성함
    * 꼭지점 셰이더, 테셀레이션 제어 셰이더, 테셀레이션 계산 셰이더, 기하 구조 셰이더, 프래그먼트 셰이더

##### 예제

* OpenGLSample.cpp 구성
  * 선언부 (1 ~ 16): 헤더 삽입, 자료형, 전역변수 선언 등
  * 셰이더 프로그램 (18 ~ 34): 꼭지점 셰이더 프래그먼트 셰이더
  * AddShader (36 ~ 58): 개벌 셰이더 추가
  * SetUpShader (60 ~ 91): 전체 셰이더 준비
  * RenderCB (93 ~ 104): 화면 렌더링 콜백 함수
  * InitVBO (106 ~ 116): 꼭지점을 저장하는 버퍼 생성
  * main (118 ~ 142): OpenGL 동작 환경 준비(윈도 생성, 콜백 함수 설정 등) 및 실행

```c++
#include <iostream>
using namespace std;

#define FREEGLUT_STATIC
#define GLEW_STATIC
#include <gl/glew.h>
#include <gl/freeglut.h>

struct Vec3f { // 3차원 좌표를 표현하기 위한 구조체
    float x, y, z;
    Vec3f() { }
    Vec3f(float _x, float _y, float _z) : x(_x), y(_y), z(_x) {}
}

enum {TRIANGLE, N_VBOs};
GLuint VBO[N_VBOs]; // 꼭지점 버퍼 객체

static void InitVBOs() {
    Vec3f Vertices[3]; // 삼각형의 꼭지점 좌표
    Vertices[0] = Vec3f(-5.0f, -5.0f, 0.0f);
    Vertices[1] = Vec3f(5.0f, -5.0f, 0.0f);
    Vertices[2] = Vec3f(0.0f, 5.0f, 0.0f);
    // 꼭지점 버퍼를 생성하여 삼각형의 꼭지점 좌표 전달
    glGenBuffers(N_VBOs, VBO); // 꼭지점 버퍼 생성 및 포인터 전달
    glBindBuffer(GL_ARRAY_BUFFER, VBO[TRIANGLE]); // 어레이 버퍼에 삼각형 버퍼 객체 전달
    glBufferData(GL_ARRAY_BUFFER, sizeof(Vertices), Vertices, GL_STATIC_DRAW); // 어레이 버퍼에 데이터 전달
}

static void RenderCB() {
    glClearColor(1.0f, 1.0f, 1.0f, 1.0f); // 화면 지울 색 선택
    glClear(GL_COLOR_BUFFER_BIT); // 화면을 지움

    glEnableVertexAttribArray(0); // 0번 버텍스 배열 활성화
    glBindBuffer(GL_ARRAY_BUFFER, VBO[TRIANGLE]); // 꼭지점 버퍼 연결
    glVertexAttibPointer(0, 3, GL_FLOAT, GL_FALSE, 0, 0); // 삼각형 좌표가 어떤 위치에 어떻게 있는지 알려줌
    // (index: 위치, size: 데이터 갯수, type: 실수형, normalize: 정규화, stride: 데이터 간격, pointer: 제일 앞 데이터)
    glDrawArrays(GL_TRIABLES, 0, 3); // mode, first, count로 그림
    glDisableVertexAttibArray(0); // 배열 비활성화
    glFinish(); // 플러시
}

// GLSL, 꼭지점 셰이더 소스
static const char* pVS = //꼭지점 셰이더 소스
"#version 330 \n" // 버전
"layout(location = 0) in vec3 Position; \n" // 꼭지점 받기 위한 레이아웃 지정
"\n"
"void main()\n"
"{\n"
"   gl_Position = vec4(Position * 0.1, 1.0);\n" // 스케일링, OpenGL은 -1 ~ 1에 그리게 된다.
"}";

static const char* pFS = // 프래그먼트 셰이더 소스
"#version 330 \n"
"out vec4 FragColor; \n"
"\n"
"void main()\n"
"{\n"
"   FragColor = vec4(1.0, 0.0, 0.0, 1.0); \n" // RGB
"}";

static void SetUpShaders() {
    GLuint shaderProg = glCreateProgram();
    if (!shaderProg) {
        cerr << "오류 - Shader 프로그램 생성" << endl;
        exit(1);
    }

    // 꼭지점 셰이더 및 프래그먼트 셰이더 적재
    AddShader(shaderProg, pVS, GL_VERTEX_SHADER);
    AddShader(shaderProg, pFS, GL_FRAGMENT_SHADER);

    GLint success = 0;
    GLchar errLog[256];

    glLinkProgram(shaderProg); // 셰이더 프로그램 링크
    glGetProgramiv(shaderProg, GL_LINK_STATUS, &success);
    if (!success) {
        glGetPrograminfoLog(shaderProg, sizeof(errLog), NULL, errLog);
        cerr << "오류 - Shader 프로그램 링크: " << errLog << endl;
        exit(1);
    }

    glValidateProgram(shaderProg); // 프로그램 객체가 유효한지 검사
    glGetProgramiv(shaderProg, GL_VALIDATE_STATUS, &success);
    if (!success) {
        glGetPrograminfoLog(shaderProg, sizeof(errLog), NULL, errLog);
        cerr << "Invalid shader program: " << errLog << endl;
        exit(1);
    }

    glUseProgram(shaderProg); // 현재 셰이더 프로그램 객체로 지정
}

static void AddShader(GLuint shaderProg, const char* pShaderScr, GLint ShaderType) {
    // 셰이더 생성
    GLuint shader = glCreateShader(ShaderType);
    if (!shader) {
        cerr << "오류 - Shader 생성(" << ShaderType << ")" << endl;
        exit(1);
    }

    // 셰이더 컴파일
    const GLchar* src[1] = { pShaderSrc };
    const GLint len[1] = { strlen(pShaderSrc) };
    glShaderSource(shader, 1, src, len);
    glCompileShader(shader);
    GLint success;
    glGetShaderiv(shader, GL_COMPILE_STATUS, &success);
    if (!success) {
        GLchar infoLog[256];
        glGetShaderInfoLog(shader, 256, NULL, infoLog);
        cerr << "오류 - Shader 컴파일(" << ShaderType << "): " << infoLog << endl;
        exit(1);
    }
    glAttachShader(shaderProg, shader);
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_SINGLE | GRUR_RGB);
    glutInitWindowPosition(50, 100);
    glutInitWindowSize(640, 480);
    glutCreateWindow("OpenGL Sample");

    GLenum s = glewInit();
    if (s != GLEW_OK) {
        cerr << "오류 - " << glewGetErrorString(s) << endl;
        return 1;
    }

    cout << "GL version: " << glGetString(GL_VERSION) << endl;
    cout << "GLSL version: " << glGetString(GL_SHADING_LANGUAGE_VERSION) << endl;

    SetUpShaders();
    InitVBOs();
    
    glutDisplayFunc(RenderCB); // 콜백 등록
    glutMainLoop();

    return 0;
}
```
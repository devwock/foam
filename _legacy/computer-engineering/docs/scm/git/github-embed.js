var gitEmbeded = {
    _apiBase: 'https://api.github.com',
    _library: {},
    _leadSlash: /^\/+|\/+$/g,
    _whiteSpace: /\s/g
};

gitEmbeded.autoload = function () {
    var nodes = document.querySelectorAll('[data-github-path]');
    for (var i = 0; i < nodes.length; i++) {
        gitEmbeded.load(nodes[i]);
    }  
};


gitEmbeded.load = function (node) {
    if (node.nodeName) {
        node = gitEmbeded.parse(node);
    }

    var apiUrl = gitEmbeded._apiBase +
        '/repos/' +
        node.path.owner +
        "/" +
        node.path.repo +
        '/contents/' +
        node.path.path +
        '?ref=' + node.path.branch

    gitEmbeded.httpGetAsync(apiUrl, gitEmbeded.parseJson, node);
}

gitEmbeded.getLineNumbers = function (lineRangeString) {
    if (!lineRangeString) {
        return;
    }
    const lineNumbers = [];

    // lineRangeString can be 1,2,3 or 1-4,5
    // Dash supports the range, commas are specfic line numbers
    lineRangeString.split(',').forEach((line) => {
        const range = line.split('-');
        // If this is a range, push the numbers inclusive in that range
        if (range.length === 2) {
            for (let i = parseInt(range[0], 10); i <= parseInt(range[1], 10); i++) {
                lineNumbers.push(i);
            }
        }
        // If it's just a single line number, push it
        else if (range.length === 1) {
            lineNumbers.push(parseInt(range[0], 10));
        }
    });
    return lineNumbers;
}

gitEmbeded.parse = function (node) {
    var path = gitEmbeded.parsePath(node.getAttribute('data-github-path'));
    var isShowLineNumbers = node.getAttribute('data-github-show-line-numbers') === 'true' || false;
    var isShowFooter = node.getAttribute('data-github-show-footer') === 'true' || false;
    var line = gitEmbeded.getLineNumbers(node.getAttribute('data-github-line'));
    var caption = node.getAttribute('data-github-caption');
    var highlightLine = gitEmbeded.getLineNumbers(node.getAttribute('data-github-highlight-line'));
    var lang = node.getAttribute('data-github-lang');
	
    return {
        path,
        isShowLineNumbers,
        isShowFooter,
        line,
        caption,
        highlightLine,
        lang,
		el: node
    }
}

gitEmbeded.parsePath = function (githubUrl) {
    var pathes = githubUrl.split('/');
    var owner = pathes[3];
    var repo = pathes[4];
    var branch = pathes[6];
    
    var path = '';
    for (var i = 7; i < pathes.length; i++) {
        path += pathes[i];
        path += '/';
    }
    path = path.substring(0, path.length - 1);

    return {
        owner,
        repo,
        branch,
        path
    }
}

gitEmbeded.httpGetAsync = function (theUrl, callback, params) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText, params);
        }
    }
    xmlHttp.open('GET', theUrl, true); // true for asynchronous 
	xmlHttp.setRequestHeader('Authorization', 'Basic ' + 'YzlhM2Y1YTMyNzQ0YmZmYjk0ZDM6N2Q4MTgxOTQ0ZjE4MTRlNmQyOWEyZTQxMzgzYmI4ZTE3YjQ0NTUwOA==');
    xmlHttp.setRequestHeader('Accept', 'application/vnd.github+json');
    xmlHttp.send();
}

gitEmbeded.decodeContent = function (content) {
    var decoded = window.atob(content.replace(gitEmbeded._whiteSpace, ''));
    return decoded;
};

gitEmbeded.parseJson = function (jsonString, params) {
    if (jsonString) {
		var el = params.el;
        var resp = JSON.parse(jsonString);

        var downloadUrl = resp.download_url;
        var fileName = resp.name;
        var fileLink = resp._links.html;
        var metaData = {
             downloadUrl,
             fileName,
             fileLink
        }
        var decoded = gitEmbeded.decodeContent(resp.content);
        decoded = decoded.replace(/[&<>"'`]/g, (function () {
            var chars = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            }
            return function (match) {
                return chars[match];
            }
        }()));

        var lines = decoded.split('\n');
		var prettyPrint = document.createElement('div');
		var gitData = document.createElement('div');
		var table = document.createElement('table');
        var prettyCode = PR.prettyPrintOne(decoded, params.lang, true);
		prettyCode = prettyCode.replace("<ol", "<tbody").replace(/(<li)(.+?>)(.+?)(.+?)(<\s?\/\s?li>)/g,'<tr$2<td class="line-code">$3$4</td></tr>');
		
		prettyPrint.setAttribute("class", "prettyprint");
		gitData.setAttribute("class", "git-data");
		table.innerHTML = prettyCode;

		var rows = table.querySelectorAll('tr');
		
		// 캡션 추가
		if (params.caption) {
			prettyPrint.appendChild(gitEmbeded.addCaption(params.caption));
        }
		
        if (params.isShowLineNumbers) {
			rows.forEach((tr, index) => {
				var td = document.createElement("td");
				var num = (index + 1);
				td.setAttribute("class", "line-number");
				td.setAttribute("data-line-number", num);
				td.innerHTML = num;
				tr.prepend(td);
			});
        }
		
		// 하이라이트 추가
		if (params.highlightLine.length > 0) {
			params.highlightLine.forEach((number, index) => {
				rows[number -1].setAttribute("class", "highlighted");
			});
        }
		
		if (params.line.length > 0) {
            table.querySelectorAll('.line-code').forEach((lineElement, index) => {
				if (!params.line.includes(index + 1) && lineElement.parentNode != null && lineElement.parentNode.parentNode != null) {
					lineElement.parentNode.parentNode.removeChild(lineElement.parentNode);
				}
			});
        }
		
		gitData.appendChild(table);
		prettyPrint.appendChild(gitData);

		if (params.isShowFooter) {
			prettyPrint.appendChild(gitEmbeded.addFooter(metaData));
        }

		el.appendChild(prettyPrint);
    }
}

gitEmbeded.addFooter = function (metaData) {
    var div = document.createElement('div');
    div.className = 'git-meta';
    
    var viewRaw = document.createElement('a');
    viewRaw.href = metaData.downloadUrl;
    viewRaw.style = 'float:right';
    viewRaw.innerText = 'view raw';
    div.appendChild(viewRaw);

    var fileMeta = document.createElement('a');
    fileMeta.href = metaData.fileLink;
    fileMeta.innerText = metaData.fileName;
    div.appendChild(fileMeta);

    var span = document.createElement('span');
    span.innerHTML = ' hosted with ❤ by ';
    div.appendChild(span);

    var github = document.createElement('a');
    github.href = 'https://github.com';
    github.innerText = 'GitHub';
    div.appendChild(github);
    
    return div;
}

gitEmbeded.addCaption = function (caption) {
	var div = document.createElement('div');
	div.setAttribute("class", "git-caption");
	div.innerHTML = caption;

    return div;
}

gitEmbeded.getLineNumbers = function(lineRangeString) {
    const lineNumbers = [];
    // lineRangeString can be 1,2,3 or 1-4,5
    // Dash supports the range, commas are specfic line numbers
	if (lineRangeString !== null) {
		lineRangeString.split(',').forEach((line) => {
		  const range = line.split('-');
		  // If this is a range, push the numbers inclusive in that range
		  if (range.length === 2) {
			for (let i = parseInt(range[0], 10); i <= parseInt(range[1], 10); i++) {
				if (lineNumbers.indexOf(i) == -1) {
					lineNumbers.push(i);
				}
			}
		  }
		  // If it's just a single line number, push it
			else if (range.length === 1) {
				var num = parseInt(range[0], 10);

				if ((lineNumbers.indexOf(num) == -1) && !isNaN(num)) {
					lineNumbers.push(num);
				}
			}
		});
	}

    return lineNumbers;
}

gitEmbeded.addHighlightLine = function (prettyCode, highlightLine) {
    element.querySelectorAll('td.line-data').forEach((el) => {
        el.style.width = '100%';
    });

    // find all .js-file-line tds (actual code lines) that match the highlightLines and add the highlight class
    element
        .querySelectorAll('.js-file-line')
        .forEach((el, index) => {
            if (highlightLineNumbers.includes(index + 1)) {
                el.style.backgroundColor = 'rgb(255, 255, 204)';
            }
        });
}


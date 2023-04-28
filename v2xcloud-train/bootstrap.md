# Bootstrap基础

## CDN

>cdn全称是内容分发网络。其目的是让用户能够更快速的得到请求的数据。简单来讲，cdn就是用来加速的，他能让用户就近访问数据，这样就更更快的获取到需要的数据。举个例子，现在服务器在北京，深圳的用户想要获取服务器上的数据就需要跨越一个很远的距离，这显然就比北京的用户访问北京的服务器速度要慢。但是现在我们在深圳建立一个cdn服务器，上面缓存住一些数据，深圳用户访问时先访问这个cdn服务器，如果服务器上有用户请求的数据就可以直接返回，这样速度就大大的提升了。

## Bootstrap5 容器

>* .container  类用于固定宽度并支持响应式布局的容器。
>* .container-fluid 类用于 100% 宽度，占据全部视口（viewport）的容器

### 容器边框和颜色

```html
<!DOCTYPE html>
<html>
<head>
  <title>Bootstrap5 实例</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.staticfile.org/twitter-bootstrap/5.1.1/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.staticfile.org/twitter-bootstrap/5.1.1/js/bootstrap.bundle.min.js"></script>
</head>
<body>
  
<div class="container p-5 my-5 border">
  <h1>我的第一个 Bootstrap 页面</h1>
  <p>这个容器有一个边框和一些边距。</p>
</div>

<div class="container p-5 my-5 bg-dark text-white">
  <h1>我的第一个 Bootstrap 页面</h1>
  <p>这个容器具有深色背景色和白色文本，以及一些额外的边距。</p>
</div>

<div class="container p-5 my-5 bg-primary text-white">
  <h1>我的第一个 Bootstrap 页面</h1>
  <p>这个容器具有蓝色背景色和白色文本，以及一些额外的边距。</p>
</div>

</body>
</html>
```

### 响应式容器

你可以使用 **.container-sm|md|lg|xl** 类来创建响应式容器。

容器的 max-width 属性值会根据屏幕的大小来改变。

| Class            | 超小屏幕 <576px | 小屏幕 ≥576px | 中等屏幕 ≥768px | 大屏幕 ≥992px | 特大屏幕 ≥1200px | 超级大屏幕 ≥1400px |
| :--------------- | :-------------- | :------------ | :-------------- | :------------ | :--------------- | :----------------- |
| `.container-sm`  | 100%            | 540px         | 720px           | 960px         | 1140px           | 1320px             |
| `.container-md`  | 100%            | 100%          | 720px           | 960px         | 1140px           | 1320px             |
| `.container-lg`  | 100%            | 100%          | 100%            | 960px         | 1140px           | 1320px             |
| `.container-xl`  | 100%            | 100%          | 100%            | 100%          | 1140px           | 1320px             |
| `.container-xxl` | 100%            | 100%          | 100%            | 100%          | 100%             | 1320px             |

## 网格系统

>Bootstrap 提供了一套响应式、移动设备优先的流式网格系统，随着屏幕或视口（viewport）尺寸的增加，系统会自动分为最多 12 列。
>
>## 网格类
>
>Bootstrap 5 网格系统有以下 6 个类:
>
>- .col- 针对所有设备。
>- .col-sm- 平板 - 屏幕宽度等于或大于 576px。
>- .col-md- 桌面显示器 - 屏幕宽度等于或大于 768px。
>- .col-lg- 大桌面显示器 - 屏幕宽度等于或大于 992px。
>- .col-xl- 特大桌面显示器 - 屏幕宽度等于或大于 1200px。
>- .col-xxl- 超大桌面显示器 - 屏幕宽度等于或大于 1400px。

### 网格系统规则

>- 网格每一行需要放在设置了 `.container` (固定宽度) 或 `.container-fluid` (全屏宽度) 类的容器中，这样就可以自动设置一些外边距与内边距。
>- 使用行来创建水平的列组。
>- 内容需要放置在列中，并且只有列可以是行的直接子节点。
>- 预定义的类如 **.row** 和 **.col-sm-4** 可用于快速制作网格布局。
>- 列通过填充创建列内容之间的间隙。 这个间隙是通过 **.rows** 类上的负边距设置第一行和最后一列的偏移。
>- **网格列是通过跨越指定的 12 个列来创建**。 例如，设置三个相等的列，需要使用三个 **.col-sm-4** 来设置。
>- Bootstrap 5 和 Bootstrap 4 使用 flexbox（弹性盒子） 而不是浮动。 Flexbox 的一大优势是，没有指定宽度的网格列将自动设置为**等宽与等高列** 。 如果您想了解有关 Flexbox 的更多信息，可以阅读我们的 [CSS Flexbox 教程](https://www.runoob.com/css3/css3-flexbox.html) 。
>
>```html
><div class="container-fluid mt-3">
>  <h1>等宽响应式列</h1>
>  <p>重置浏览器大小查效果。</p>
>  <p> 在移动设备上，即屏幕宽度小于 576px 时，四个列将会上下堆叠排版。</p>
>  <div class="row">
>     @*sm-3 后面的3指定列的宽度*@
>    <div class="col-sm-3 p-3 bg-primary text-white">.col</div>
>    <div class="col-sm-3 p-3 bg-dark text-white">.col</div>
>    <div class="col-sm-3 p-3 bg-primary text-white">.col</div>
>    <div class="col-sm-3 p-3 bg-dark text-white">.col</div>
>  </div>
></div>
>```

* 布局嵌套

  >```html
  ><div class="container-fluid">
  >  <div class="row">
  >    <div class="col-8 bg-warning p-4">
  >      .col-8
  >      <div class="row">
  >        <div class="col-6 bg-light p-2">.col-6</div>
  >        <div class="col-6 bg-secondary p-2">.col-6</div>
  >      </div>
  >    </div>
  >    <div class="col-4 bg-success p-4">.col-4</div>
  >  </div>
  ></div>
  >```
  >
  >
  >
  >

* 偏移列

  >偏移列通过 **offset-\*-\*** 类来设置。第一个星号( * )可以是 **sm、md、lg、xl**，表示屏幕设备类型，第二个星号( * )可以是 **1** 到 **11** 的数字。
  >
  >为了在大屏幕显示器上使用偏移，请使用 **.offset-md-\*** 类。这些类会把一个列的左外边距（margin）增加 ***** 列，其中 ***** 范围是从 **1** 到 **11**。
  >
  >例如：.offset-md-4 是把.col-md-4 往右移了四列格。
  >
  >```html
  ><div class="row">
  >    <div class="col-md-4 p-3 bg-primary text-white">
  >        .col-md-4
  >    </div>
  >    <div class="col-md-4 offset-md-4 bg-bark text-white">
  >        .col-md-4 .offset-md-4
  >    </div>
  >    <div class="row">
  >	  <div class="col-md-3 offset-md-3 bg-primary text-white">.col-md-3 .offset-md-3</div>
  >	  <div class="col-md-3 offset-md-3 bg-dark text-white">.col-md-3 .offset-md-3</div>
  >	</div>
  >	<div class="row">
  >	  <div class="col-md-6 offset-md-3 bg-primary text-white">.col-md-6 .offset-md-3</div>
  >	</div>
  ></div>
  >
  >
  >```



## Bootstrap5 文字排版

>Bootstrap 5 默认的 **font-size** 为 16px, **line-height** 为 1.5。
>
>默认的 **font-family** 为 "Helvetica Neue", Helvetica, Arial, sans-serif。
>
>此外，所有的 **<p>** 元素 **margin-top: 0** 、 **margin-bottom: 1rem** (16px)。
>
>* /<h1>-<h6>/
>
>  >
>
>* Display标题类
>
>  >```htm
>  ><div class="container">
>  >  <h1>Display 标题</h1>
>  >  <p>Display 标题可以输出更大更粗的字体样式。</p>
>  >  <h1 class="display-1">Display 1</h1>
>  >  <h1 class="display-2">Display 2</h1>
>  >  <h1 class="display-3">Display 3</h1>
>  >  <h1 class="display-4">Display 4</h1>
>  ></div>
>  >```
>
>* /<small>/
>
>  >在 Bootstrap 5 中 HTML **<small>** 元素用于创建字号更小的颜色更浅的文本:
>  >
>  >```html
>  ><div class="container">
>  >  <h1>更小文本标题</h1>
>  >  <p>small 元素用于字号更小的颜色更浅的文本:</p>       
>  >  <h1>h1 标题 <small>副标题</small></h1>
>  >  <h2>h2 标题 <small>副标题</small></h2>
>  >  <h3>h3 标题 <small>副标题</small></h3>
>  >  <h4>h4 标题 <small>副标题</small></h4>
>  >  <h5>h5 标题 <small>副标题</small></h5>
>  >  <h6>h6 标题 <small>副标题</small></h6>
>  ></div>
>  >```
>
>* /<mark>/
>
>  >Bootstrap 5 定义 **<mark>** 标签及 **.mark** 类为黄色背景及有一定的内边距:
>  >
>  >```html
>  ><div class="container">
>  >  <h1>高亮文本</h1>    
>  >  <p>使用 mark 元素来 <mark>高亮</mark> 文本。</p>
>  ></div>
>  >```
>
>* /<abbr>/
>
>  >Bootstrap 5 定义 HTML **<abbr>** 元素的样式为显示在文本底部的一条虚线边框:
>  >
>  >```html
>  ><div class="container">
>  >    <h1>Abbreviations</h1>
>  >    <p>The abbr element is used to mark up an abbreviation or acronym:</p>
>  >	<p>
>  >        The <abbr title="World Health Organization">WHO</abbr>
>  >        was founded in 1948
>  >    </p>
>  ></div>
>  >```
>
>* /<blockquote>/
>
>  >对于引用的内容可以在 **<blockquote>** 上添加 **.blockquote** 类 :
>  >
>  >```html
>  ><div class="container">
>  >  <h1>Blockquotes</h1>
>  >  <p>The blockquote element is used to present content from another source:</p>
>  >  <blockquote class="blockquote">
>  >    <p>For 50 years, WWF has been protecting the future of nature. The world's leading conservation organization, WWF works in 100 countries and is supported by 1.2 million members in the United States and close to 5 million globally.</p>
>  >    <footer class="blockquote-footer">From WWF's website</footer>
>  >  </blockquote>
>  ></div>
>  >```
>
>* /<dl>/
>
>  >```html
>  ><div>
>  >    <h1>
>  >        Description Lists
>  >    </h1>
>  >    <p>
>  >       The dl element indicates a description list: 
>  >    </p>
>  >    <dl>
>  >        <dt>Coffee</dt>
>  >        <dd>- black hot drink</dd>
>  >        <dt>Milk</dt>
>  >        <dd>- white cold drink</dd>
>  >    </dl>
>  >    
>  ></div>
>  >```
>  >
>  >
>
>  ​	

### 更多的排版类

|                      |                                                              |
| :------------------- | :----------------------------------------------------------- |
| 类名                 | 描述                                                         |
| **.lead**            | 让段落更突出                                                 |
| **.small**           | 指定更小文本 (为父元素的 85% )                               |
| **.text-start**      | 左对齐                                                       |
| **.text-center**     | 居中                                                         |
| **.text-end**        | 右对齐                                                       |
| **.text-justify**    | 设定文本对齐,段落中超出屏幕部分文字自动换行                  |
| **.text-nowrap**     | 段落中超出屏幕部分不换行                                     |
| **.text-lowercase**  | 设定文本小写                                                 |
| **.text-uppercase**  | 设定文本大写                                                 |
| **.text-capitalize** | 设定单词首字母大写                                           |
| **.initialism**      | 显示在 <abbr> 元素中的文本以小号字体展示，且可以将小写字母转换为大写字母 |
| **.list-unstyled**   | 移除默认的列表样式，列表项中左对齐 ( <ul> 和 <ol> 中)。 这个类仅适用于直接子列表项 (如果需要移除嵌套的列表项，你需要在嵌套的列表中使用该样式) |
| **.list-inline**     | 将所有列表项放置同一行                                       |





## Bootstrap5 颜色

>Bootstrap 5 提供了一些有代表意义的颜色类：**.text-muted**, **.text-primary**, **.text-success**, **.text-info**, **.text-warning**, **.text-danger**, **.text-secondary**, **.text-white**, **.text-dark**, **.text-body** (默认颜色，为黑色) and **.text-light**:
>
>```html
><div class="container">
>  <h2>代表指定意义的文本颜色</h2>
>  <p class="text-muted">柔和的文本。</p>
>  <p class="text-primary">重要的文本。</p>
>  <p class="text-success">执行成功的文本。</p>
>  <p class="text-info">代表一些提示信息的文本。</p>
>  <p class="text-warning">警告文本。</p>
>  <p class="text-danger">危险操作文本。</p>
>  <p class="text-secondary">副标题。</p>
>  <p class="text-dark">深灰色文字。</p>
>  <p class="text-body">默认颜色，为黑色。</p>
>  <p class="text-light">浅灰色文本（白色背景上看不清楚）。</p>
>  <p class="text-white">白色文本（白色背景上看不清楚）。</p>
></div>
>```
>
>可以设置文本颜色透明度为 50% ，使用 **.text-black-50** 或 **.text-white-50** 类:
>
>* 背景颜色
>
>  >提供背景颜色的类有: **.bg-primary**, **.bg-success**, **.bg-info**, **.bg-warning**, **.bg-danger**, **.bg-secondary**, **.bg-dark** 和 **.bg-light**。
>  >
>  >注意背景颜色不会设置文本的颜色，在一些实例中你需要与 **.text-\*** 类一起使用。
>  >
>  >```html
>  ><div class="container">
>  >  <h2>背景颜色</h2>
>  >  <p class="bg-primary text-white">重要的背景颜色。</p>
>  >  <p class="bg-success text-white">执行成功背景颜色。</p>
>  >  <p class="bg-info text-white">信息提示背景颜色。</p>
>  >  <p class="bg-warning text-white">警告背景颜色</p>
>  >  <p class="bg-danger text-white">危险背景颜色。</p>
>  >  <p class="bg-secondary text-white">副标题背景颜色。</p>
>  >  <p class="bg-dark text-white">黑色背景颜色。</p>
>  >  <p class="bg-light text-dark">浅灰背景颜色。</p>
>  ></div>
>  >```
>  >
>  >



## Bootstrap5 表格

>Bootstrap5 通过 **.table** 类来设置基础表格的样式，实例如下:
>
>```html
><table class="table">
>    <thead>
>        <tr>
>            <th>Firstname</th>
>            <th>Lastname</th>
>            <th>Email</th>
>        </tr>
>    </thead>
>    <tbody>
>        <tr>
>            <td></td>
>            <td></td>
>            <td></td>
>        </tr>
>        <tr>
>            <td></td>
>            <td></td>
>            <td></td>
>        </tr>
>        <tr>
>            <td></td>
>            <td></td>
>            <td></td>
>        </tr>
>    </tbody>
></table>
>```
>
>* table-striped 类，条纹表格
>
>>```html
>><table class="table table-striped">
>>    <thead>
>>      <tr>
>>        <th>Firstname</th>
>>        <th>Lastname</th>
>>        <th>Email</th>
>>      </tr>
>>    </thead>
>>    <tbody>
>>      <tr>
>>        <td>John</td>
>>        <td>Doe</td>
>>        <td>john@example.com</td>
>>      </tr>
>>      <tr>
>>        <td>Mary</td>
>>        <td>Moe</td>
>>        <td>mary@example.com</td>
>>      </tr>
>>      <tr>
>>        <td>July</td>
>>        <td>Dooley</td>
>>        <td>july@example.com</td>
>>      </tr>
>>    </tbody>
>></table>
>>```
>
>* table-bordered* 类可以为表格添加边框
>* **.table-hover** 类可以为表格的每一行添加鼠标悬停效果（灰色背景）：
>* 联合使用 **.table-dark** 和 **.table-striped** 类可以创建黑色的条纹表格：
>* **.table-borderless** 类可以设置一个无边框的表格：
>
>下表列出了表格颜色类的说明:
>
>| 类名                 | 描述                             |
>| :------------------- | :------------------------------- |
>| **.table-primary**   | 蓝色: 指定这是一个重要的操作     |
>| **.table-success**   | 绿色: 指定这是一个允许执行的操作 |
>| **.table-danger**    | 红色: 指定这是可以危险的操作     |
>| **.table-info**      | 浅蓝色: 表示内容已变更           |
>| **.table-warning**   | 橘色: 表示需要注意的操作         |
>| **.table-active**    | 灰色: 用于鼠标悬停效果           |
>| **.table-secondary** | 灰色: 表示内容不怎么重要         |
>| **.table-light**     | 浅灰色，可以是表格行的背景       |
>| **.table-dark**      | 深灰色，可以是表格行的背景       |
>
>* 指定意义的颜色类
>
>>```html
>><div class="container mt-3">
>>  <h2>指定意义的颜色类</h2>
>>  <p>通过指定意义的颜色类可以为表格的行或者单元格设置颜色：</p>            
>>  <table class="table">
>>    <thead>
>>      <tr>
>>        <th>Firstname</th>
>>        <th>Lastname</th>
>>        <th>Email</th>
>>      </tr>
>>    </thead>
>>    <tbody>
>>      <tr>
>>        <td>Default</td>
>>        <td>Defaultson</td>
>>        <td>def@somemail.com</td>
>>      </tr>      
>>      <tr class="table-primary">
>>        <td>Primary</td>
>>        <td>Joe</td>
>>        <td>joe@example.com</td>
>>      </tr>
>>      <tr class="table-success">
>>        <td>Success</td>
>>        <td>Doe</td>
>>        <td>john@example.com</td>
>>      </tr>
>>      <tr class="table-danger">
>>        <td>Danger</td>
>>        <td>Moe</td>
>>        <td>mary@example.com</td>
>>      </tr>
>>      <tr class="table-info">
>>        <td>Info</td>
>>        <td>Dooley</td>
>>        <td>july@example.com</td>
>>      </tr>
>>      <tr class="table-warning">
>>        <td>Warning</td>
>>        <td>Refs</td>
>>        <td>bo@example.com</td>
>>      </tr>
>>      <tr class="table-active">
>>        <td>Active</td>
>>        <td>Activeson</td>
>>        <td>act@example.com</td>
>>      </tr>
>>      <tr class="table-secondary">
>>        <td>Secondary</td>
>>        <td>Secondson</td>
>>        <td>sec@example.com</td>
>>      </tr>
>>      <tr class="table-light">
>>        <td>Light</td>
>>        <td>Angie</td>
>>        <td>angie@example.com</td>
>>      </tr>
>>      <tr class="table-dark text-dark">
>>        <td>Dark</td>
>>        <td>Bo</td>
>>        <td>bo@example.com</td>
>>      </tr>
>>    </tbody>
>>  </table>
>></div>
>>```
>
>**.table-responsive** 类用于创建响应式表格：在屏幕宽度小于 992px 时会创建水平滚动条，如果可视区域宽度大于 992px 则显示不同效果（没有滚动条）:



## 信息提示框

>提示框可以使用 **.alert** 类, 后面加上 **.alert-success**, **.alert-info**, **.alert-warning**, **.alert-danger**, **.alert-primary**, **.alert-secondary**, **.alert-light** 或 **.alert-dark** 类来实现:
>
>```html
><div class="alert alert-success">
>  <strong>成功!</strong> 指定操作成功提示信息。
></div>
>```

### 关闭提示框

>我们可以在提示框中的 div 中添加 **.alert-dismissible** 类，然后在关闭按钮的链接上添加 **class="btn-close"** 和 **data-bs-dismiss="alert"** 类来设置提示框的关闭操作。
>
>```htm
><div class="alert alert-success alert-dismissible">
>  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
>  <strong>成功!</strong> 指定操作成功提示信息。
></div>
>```

### 提示框动画

>**.fade** 和 **.show** 类用于设置提示框在关闭时的淡出和淡入效果：
>
>```html
><div class="alert alert-danger alert-dismissible fade show">
>```



## 按钮

### 按钮设置边框

>Bootstrap 5 也可以设置按钮多边框，鼠标移动到按钮上添加突出到效果：
>
>```html
><button type="button" class="btn btn-outline-primary">主要按钮</button>
><button type="button" class="btn btn-outline-secondary">次要按钮</button>
><button type="button" class="btn btn-outline-success">成功</button>
><button type="button" class="btn btn-outline-info">信息</button>
><button type="button" class="btn btn-outline-warning">警告</button>
><button type="button" class="btn btn-outline-danger">危险</button>
><button type="button" class="btn btn-outline-dark">黑色</button>
><button type="button" class="btn btn-outline-light text-dark">浅色</button>
>```

### 不同大小的按钮

>Bootstrap 5 可以设置按钮的大小，使用 **.btn-lg** 类设置大按钮，使用 **.btn-sm** 类设置小按钮：
>
>```html
><button type="button" class="btn btn-primary btn-lg">大号按钮</button>
><button type="button" class="btn btn-primary">默认按钮</button>
><button type="button" class="btn btn-primary btn-sm">小号按钮</button>
>```

## 块级按钮

>通过添加 **.btn-block** 类可以设置块级按钮，**.d-grid** 类设置在父级元素中：

```html
<div class="d-grid gap-3">
  <button type="button" class="btn btn-primary btn-block">100% 宽度的按钮</button>
  <button type="button" class="btn btn-primary btn-block">100% 宽度的按钮</button>
  <button type="button" class="btn btn-primary btn-block">100% 宽度的按钮</button>
</div>
```

## 激活和禁用的按钮

>按钮可设置为激活或者禁止点击的状态。
>
>**.active** 类可以设置按钮是可用的， **disabled** 属性可以设置按钮是不可点击的。 注意 <a> 元素不支持 disabled 属性，你可以通过添加 **.disabled** 类来禁止链接的点击。
>
>```html
><button type="button" class="btn btn-primary active">点击后的按钮</button>
><button type="button" class="btn btn-primary" disabled>禁止点击的按钮</button>
><a href="#" class="btn btn-primary disabled">禁止点击的链接</a>
>```

## 加载按钮

>我们也可以设置一个正在加载的按钮
>
>```html
><div class="container mt-3">
>  <h2>加载按钮</h2>
>  <p>按钮添加正在加载按钮:</p>
>                                        
>  <button class="btn btn-primary">
>    <span class="spinner-border spinner-border-sm"></span>
>  </button>
>
>  <button class="btn btn-primary">
>    <span class="spinner-border spinner-border-sm"></span>
>    Loading..
>  </button>
>  
>  <button class="btn btn-primary" disabled>
>    <span class="spinner-border spinner-border-sm"></span>
>    Loading..
>  </button>
>  
>  <button class="btn btn-primary" disabled>
>    <span class="spinner-grow spinner-grow-sm"></span>
>    Loading..
>  </button>
></div>
>```

## 按钮组

>可以在 **<div>** 元素上添加 **.btn-group** 类来创建按钮组。
>
>我们可以使用 **.btn-group-lg|sm|xs** 类来设置按钮组的大小。
>
>```html
><div class="btn-group btn-group-lg">
>  <button type="button" class="btn btn-primary">Apple</button>
>  <button type="button" class="btn btn-primary">Samsung</button>
>  <button type="button" class="btn btn-primary">Sony</button>
></div>
>```

### 垂直按钮组

>可以使用 **.btn-group-vertical** 类来创建垂直的按钮组：
>
>```html
><div class="btn-group-vertical">
>  <button type="button" class="btn btn-primary">Apple</button>
>  <button type="button" class="btn btn-primary">Samsung</button>
>  <button type="button" class="btn btn-primary">Sony</button>
></div>
>```

### 内嵌按钮组及下拉菜单

>我们可以在按钮组内设置下拉菜单：
>
>```html
><div class="container mt-3">
>  <h2>内嵌按钮组</h2>
>  <p>按钮组设置下拉菜单:</p>
>  <div class="btn-group">
>    <button type="button" class="btn btn-primary">Apple</button>
>    <button type="button" class="btn btn-primary">Samsung</button>
>    <div class="btn-group">
>      <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">Sony</button>
>      <ul class="dropdown-menu">
>        <li><a class="dropdown-item" href="#">Tablet</a></li>
>        <li><a class="dropdown-item" href="#">Smartphone</a></li>
>      </ul>
>    </div>
>  </div>
></div>
>```



## 徽章

>徽章（Badges）主要用于突出显示新的或未读的项。如需使用徽章，只需要将 **.badge** 类加上带有指定意义的颜色类 (如 **.bg-secondary**) 添加到 **<span>** 元素上即可。 徽章可以根据父元素的大小的变化而变化:

### 徽章插入到元素内

>```html
><button type="button" class="btn btn-primary">
>  Messages <span class="badge bg-light">4</span>
></button>
>```
>
>



## 进度条

>创建一个基本的进度条的步骤如下：
>
>- 添加一个带有 **.progress** 类的 <div>。
>- 接着，在上面的 <div> 内，添加一个带有 class **.progress-bar** 的空的 <div>。
>- 添加一个带有百分比表示的宽度的 style 属性，例如 **style="width:70%"** 表示进度条在 **70%** 的位置
>
>```html
><div class="progress">
>    <div class="progress-bar" style="width:70%">
>        
>    </div>
></div>
>```

### 带条纹的进度条

>可以使用 `.progress-bar-striped` 类来设置条纹进度条：
>
>```html
><div class="progress">
>    <div class="progress-bar progress-bar-striped"
>         style="width:40%"> 
>    </div>
></div>
>```

### 动画进度条

>使用 `.progress-bar-animated` 类可以为进度条添加动画：
>
>```html
><div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 40%"></div>
>```

### 混合色彩进度条

>```html
><div class="progress">
>    <div class="progress-bar bg-success" style="width:40%">
>        Free Space
>    </div>
>    <div class="progress-bar bg-warning" style="width:10%">
>        Warning
>    </div>
>    <div class="progress-bar bg-danger" style="width:20%">
>        Danger
>    </div>
></div>
>```
>
>





## 加载效果

>要创建加载中效果可以使用 **.spinner-border** 类:
>
>```html
><div class="spinner-border"></div>
>```
>
>

### 闪烁加载效果

>使用 .spinner-grow 类来设置闪烁的加载效果:
>
>```html
><div class="spinner-grow text-muted"></div>
><div class="spinner-grow text-primary"></div>
><div class="spinner-grow text-success"></div>
><div class="spinner-grow text-info"></div>
><div class="spinner-grow text-warning"></div>
><div class="spinner-grow text-danger"></div>
><div class="spinner-grow text-secondary"></div>
><div class="spinner-grow text-dark"></div>
><div class="spinner-grow text-light"></div>
>```
>
>* 设置加载效果大小
>
>  >使用.spinner-border-sm 或 .spinner-grow-sm 类来创建加载效果的大小:

## 分页

>网页开发过程，如果碰到内容过多，一般都会做分页处理。
>
>Bootstrap 5 可以很简单的实现分页效果。
>
>要创建一个基本的分页可以在 **<ul>** 元素上添加 **.pagination** 类。然后在 **<li>** 元素上添加 **.page-item** 类，**<li>** 元素的 <a> 标签上添加 **.page-link** 类:
>
>```html
><ul class="pagination">
>	<li class="page-item"> <a class="page-link" href="#">Previous</li>
>    <li class="page-item"> <a class="page-link" href="#">1</li>
>    <li class="page-item"> <a class="page-link" href="#">2</li>
>    <li class="page-item"> <a class="page-link" href="#">3</li>
>    <li class="page-item"> <a class="page-link" href="#">4</li>
></ul>
>```

### 当前页页码状态

```html
<ul class="pagination">
  <li class="page-item"><a class="page-link" href="#">Previous</a></li>
  <li class="page-item"><a class="page-link" href="#">1</a></li>
  <li class="page-item active"><a class="page-link" href="#">2</a></li>
  <li class="page-item"><a class="page-link" href="#">3</a></li>
  <li class="page-item"><a class="page-link" href="#">Next</a></li>
</ul>
```

* **.disabled** 类可以设置分页链接不可点击:

* 面包屑导航

  >```html
  ><ul class="breadcrumb">
  >  <li class="breadcrumb-item"><a href="#">Photos</a></li>
  >  <li class="breadcrumb-item"><a href="#">Summer 2017</a></li>
  >  <li class="breadcrumb-item"><a href="#">Italy</a></li>
  >  <li class="breadcrumb-item active">Rome</li>
  ></ul>
  >```
  >
  >



## 列表组

>要创建列表组，可以在 **<ul>** 元素上添加 **.list-group** 类, 在 **<li>** 元素上添加 **.list-group-item** 类:

### 颜色设置

>列表项目的颜色可以通过以下列来设置： **.list-group-item-success**, **list-group-item-secondary**, **list-group-item-info**, **list-group-item-warning**, **.list-group-item-danger**, **list-group-item-dark** 和 **list-group-item-light**:
>
>```html
><ul class="list-group">
>  <li class="list-group-item list-group-item-success">成功列表项</li>
>  <li class="list-group-item list-group-item-secondary">次要列表项</li>
>  <li class="list-group-item list-group-item-info">信息列表项</li>
>  <li class="list-group-item list-group-item-warning">警告列表项</li>
>  <li class="list-group-item list-group-item-danger">危险列表项</li>
>  <li class="list-group-item list-group-item-primary">主要列表项</li>
>  <li class="list-group-item list-group-item-dark">深灰色列表项</li>
>  <li class="list-group-item list-group-item-light">浅色列表项</li>
></ul>
>```

## 卡片

### 简单的卡片

```html
<div class="card">
  <div class="card-body">简单的卡片</div>
</div>
```

### 头部和底部

>**.card-header**类用于创建卡片的头部样式， **.card-footer** 类用于创建卡片的底部样式：
>
>```html
><div class="card">
>  <div class="card-header">头部</div>
>  <div class="card-body">内容</div> 
>  <div class="card-footer">底部</div>
></div>
>```

### 图片卡片

我们可以给 **<img>** 添加 **.card-img-top**（图片在文字上方） 或 **.card-img-bottom**（图片在文字下方 来设置图片卡片：

```html
<div class="card" style="width:400px">
  <img decoding="async" class="card-img-top" src="img_avatar1.png" alt="Card image">
  <div class="card-body">
    <h4 class="card-title">John Doe</h4>
    <p class="card-text">Some example text.</p>
    <a href="#" class="btn btn-primary">See Profile</a>
  </div>
</div>
```

* 图片为背景: 如果图片要设置为背景，可以使用 **.card-img-overlay** 类:

```html
<div class="card" style="width:500px">
  <img decoding="async" class="card-img-top" src="img_avatar1.png" alt="Card image">
  <div class="card-img-overlay">
    <h4 class="card-title">John Doe</h4>
    <p class="card-text">Some example text.</p>
    <a href="#" class="btn btn-primary">See Profile</a>
  </div>
</div>
```

## Bootstrap5 下拉菜单

>**.dropdown** 类用来指定一个下拉菜单。
>
>我们可以使用一个按钮或链接来打开下拉菜单， 按钮或链接需要添加 **.dropdown-toggle** 和 **data-toggle="dropdown"** 属性。
>
><div> 元素上添加 .dropdown-menu 类来设置实际下拉菜单，然后在下拉菜单的选项中添加 .dropdown-item 类。
>
>```html
><div class="dropdown">
>    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"></button>
>    <div class="dropdown-menu">
>        <a class="dropdown-item" href="#">链接 1</a>
>        <a class="dropdown-item" href="#">链接 2</a>
>        <a class="dropdown-item" href="#">链接 3</a>
>  </div>
></div>
>```

### 分割线

```html
<li><hr class="dropdown-divider"></hr></li>
<a class="dropdown-item" href="#">常规项</a>
<a class="dropdown-item active" href="#">激活项</a>
<a class="dropdown-item disabled" href="#">禁用项</a>
```



**.dropdown-divider** 类用于在下拉菜单中创建一个水平的分割线：

**.dropdown-header** 类用于在下拉菜单中添加标题：

.active 类会让下拉菜单的选项高亮显示 (添加蓝色背景)。

如果要禁用下拉菜单的选项，可以使用**.disabled** 类。

### 下拉菜单的定位

>如果我们想让下拉菜单右对齐，可以在元素上的 **.dropdown** 类后添加 **.dropend** 或 **.dropstart** 类。
>
>**.dropend** 是右对齐， **.dropstart** 是左对齐。
>
>```html
><!-- 右对齐 -->
><div class="dropdown dropend">
>...
></div>
> 
><!-- 左对齐 -->
><div class="dropdown dropstart">
>...
></div>
>```

## 折叠

>Bootstrap5 折叠可以很容易的实现内容的显示与隐藏。
>
>```html
><div class="container mt-3">
>    <button type="button" class="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#demo">折叠</button>
>  <div id="demo" class="collapse">
>    这里是一些测试的内容。。。这里是一些测试的内容。。。这里是一些测试的内容。。。这里是一些测试的内容。。。这里是一些测试的内容。。。
>  </div>
></div>
>```
>
>默认情况下折叠的内容是隐藏的，你可以添加 **.show** 类让内容默认显示:
>
>```html
><div id="demo" class="collapse show">
>这里是一些测试的内容。。。
></div>
>```

### 手风琴案例

>使用 **data-bs-parent** 属性来确保所有的折叠元素在指定的父元素下，这样就能实现在一个折叠选项显示时其他选项就隐藏。
>
>```html
><div id="accordion">
>    <div class="card">
>        <div class="card-header">
>            <a class="btn" data-bs-toggle="collapse" href="#collapseOne"></a>
>        </div>
>        <div id="collapseOne" class="collapse show" data-bs-parent="#accordion">
>            <div class="card-body">
>                #1 内容：菜鸟教程 -- 学的不仅是技术，更是梦想！！！
>            </div>
>         </div>
>    </div>
>    <div class="card">
>        <div class="card-header">
>            <a class="btn" data-bs-toggle="collapse" href="#collapseTwo"></a>
>        </div>
>        <div id="collapseTwo" class="collapse" data-bs-parent="#accordion">
>            <div class="card-body">
>                #2 内容：菜鸟教程 -- 学的不仅是技术，更是梦想！！！
>            </div>
>         </div>
>    </div>
>    <div class="card">
>        <div class="card-header">
>            <a class="btn" data-bs-toggle="collapse" href="#collapseOThree"></a>
>        </div>
>        <div id="collapseOThree" class="collapse show" data-bs-parent="#accordion">
>            <div class="card-body">
>                #3 内容：菜鸟教程 -- 学的不仅是技术，更是梦想！！！
>            </div>
>         </div>
>    </div>
></div>
>```
>
>

## 导航

>* 选项卡
>
>  >```html
>  ><ul class="nav nav-tabs">
>  >    <li class="nav-item">
>  >        <a class="nav-link active" href="#">Active</a>
>  >    </li>
>  >    <li class="nav-item">
>  >        <a class="nav-link" href="#">Link</a>
>  >    </li>
>  >    <li class="nav-item">
>  >        <a class="nav-link" href="#">Link</a>
>  >    </li>
>  >    <li class="nav-item">
>  >        <a class="nav-link disabled" href="#">Disable</a>
>  >    </li>
>  ></ul>
>  >```
>  >
>  >
>
>* 胶囊导航
>
>  >**.nav-pills** 类可以将导航项设置成胶囊形状。
>
>* 动态选项卡
>
>  >如果你要设置选项卡是动态可切换的，可以在每个链接上添加 **data-bs-toggle="tab"** 属性。 然后在每个选项对应的内容的上添加 **.tab-pane** 类，对应选项卡的内容的 **<div>** 标签使用 **.tab-content** 类 。
>  >
>  >如果你希望有淡入效果可以在 **.tab-pane** 后添加 **.fade**类:
>  >
>  >```html
>  ><ul class="nav nav-tabs">
>  >  <li class="nav-item">
>  >    <a class="nav-link active" data-bs-toggle="tab" href="#home">Home</a>
>  >  </li>
>  >  <li class="nav-item">
>  >    <a class="nav-link" data-bs-toggle="tab" href="#menu1">Menu 1</a>
>  >  </li>
>  >  <li class="nav-item">
>  >    <a class="nav-link" data-bs-toggle="tab" href="#menu2">Menu 2</a>
>  >  </li>
>  ></ul>
>  >
>  ><!-- Tab panes -->
>  ><div class="tab-content">
>  >  <div class="tab-pane active container" id="home">...</div>
>  >  <div class="tab-pane container" id="menu1">...</div>
>  >  <div class="tab-pane container" id="menu2">...</div>
>  ></div>
>  >```
>  >
>  >

## 轮播

```html
<div id="demo" calss="carousel slid" data-bs-ride="carousel">
    <!-- 指示符 -->
   <div class="carousel-indicators">
    <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
    <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
    <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
  </div>
    <!-- 轮播图片 -->
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://static.runoob.com/images/mix/img_fjords_wide.jpg" class="d-block" style="width:100%">
    </div>
    <div class="carousel-item">
      <img src="https://static.runoob.com/images/mix/img_nature_wide.jpg" class="d-block" style="width:100%">
    </div>
    <div class="carousel-item">
      <img src="https://static.runoob.com/images/mix/img_mountains_wide.jpg" class="d-block" style="width:100%">
    </div>
  </div>
    <!-- 左右切换按钮 -->
  <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
  </button>
</div>
```

## 模态框

模态框（Modal）是覆盖在父窗体上的子窗体。通常，目的是显示来自一个单独的源的内容，可以在不离开父窗体的情况下有一些互动。子窗体可提供信息交互等

```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
  打开模态框
</button>
 
 
<!-- 模态框 -->
<div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">模态框标题</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
 
      <!-- 模态框内容 -->
      <div class="modal-body">
        模态框内容..
      </div>
 
      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">关闭</button>
      </div>
 
    </div>
  </div>
</div>
```

* 添加动画

  >使用 .fade 类可以设置模态框弹出或关闭的效果:

* ## 模态框尺寸

  我们可以通过添加 **.modal-sm** 类来创建一个小模态框，**.modal-lg** 类可以创建一个大模态框。

  尺寸类放在 **<div>**元素的 **.modal-dialog** 类后 :

## 提示框

>通过向元素添加 **data-bs-toggle="tooltip"** 来来创建提示框。
>
>**title** 属性的内容为提示框显示的内容：
>
>**注意:** 提示框要写在 JavaScript 的初始化代码里: 然后在指定的元素上调用 **tooltip()** 方法。
>
>以下实例可以在文档的任何地方使用提示框：
>
>```html
><div class="container mt-3">
>  <h3>提示框实例</h3>
>  
>  <button type="button" class="btn btn-primary" data-bs-toggle="tooltip" title="我是提示内容!">
>    鼠标移动到我这
>  </button>
></div>
>
><script>
>    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
>var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
>  return new bootstrap.Tooltip(tooltipTriggerEl)
>})
></script>
>```
>
>默认情况下提示框显示在元素上方。
>
>可以使用 **data-bs-placement** 属性来设定提示框显示的方向: top, bottom, left 或 right:
>
>```html
><div class="container mt-3">
>  <h3>提示框显示位置实例</h3>
>  <p>可以使用 data-bs-placement 属性来设定提示框显示的方向:</p>
>  <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="我是提示内容!">鼠标移动到我这</a>
>  <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="我是提示内容!">鼠标移动到我这</a>
>  <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="我是提示内容!">鼠标移动到我这</a>
>  <a href="#" data-bs-toggle="tooltip" data-bs-placement="right" title="我是提示内容!">鼠标移动到我这</a>
></div>
>
><script>
>var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
>var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
>  return new bootstrap.Tooltip(tooltipTriggerEl)
>})
></script>
>```

## 弹出提示框

>通过向元素添加 **data-bs-toggle="popover"** 来来创建弹出框。
>
>**title** 属性的内容为弹出框的标题，**data-bs-content** 属性显示了弹出框的文本内容：
>
>**注意:** 弹出框要写在 JavaScript 的初始化代码里。
>
>以下实例可以在文档的任何地方使用弹出框：
>
>```html
><div class="container mt-3">
>    <h3>
>        弹出框实例
>    </h3>
>    <button type="button" class="btn btn-primary" data-bs-toggle="popover" title="弹出框标题" data-bs-content="弹出框内容">
>    多次点我
>  	</button>
>    <script>
>        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
>		var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
>  			return new bootstrap.Popover(popoverTriggerEl)
>		})
>    </script>
></div>
>```

## Bootstrap5 滚动监听(Scrollspy)

```html
<nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
    <div class="container-fluid">
        <ul class="navbar-nav">
           	<li class="nav-item">
        	   <a class="nav-link" href="#section1">Section 1</a>
            </li>
            <li class="nav-item">
               <a class="nav-link" href="#section2">Section 2</a>
            </li>
            <li class="nav-item">
               <a class="nav-link" href="#section3">Section 3</a>
            </li>
        </ul>
    </div>
</nav>

<div id="section1" class="container-fluid bg-success text-white" style="padding:100px 20px;">
  <h1>Section 1</h1>
  <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
  <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
</div>

<div id="section2" class="container-fluid bg-warning" style="padding:100px 20px;">
  <h1>Section 2</h1>
  <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
  <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
</div>

<div id="section3" class="container-fluid bg-secondary text-white" style="padding:100px 20px;">
  <h1>Section 3</h1>
  <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
  <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
</div>
```

## 侧边栏导航(Offcanvas)

我们可以通过 JavaScript 来设置是否在 `.offcanvas` 类后面添加 `.show` 类，从而控制侧边栏的显示与隐藏：

- `.offcanvas` 隐藏内容 (默认)
- `.offcanvas.show` 显示内容

可以使用 a 链接的 `href` 属性或者 button 元素使用 `data-bs-target` 属性来设置侧边栏。这两种情况都需要使用 `data-bs-toggle="offcanvas"`。

创建滑动导航实例如下：

```html
<a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
  使用链接的 href 属性
</a>
<button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
  按钮中使用 data-bs-target
</button>
<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">侧边栏</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div>
      Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
    </div>
    <div class="dropdown mt-3">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
        Dropdown button
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
      </ul>
    </div>
  </div>
</div>
```

可以通过以下四个类来控制侧边栏的方向：

- `.offcanvas-start` 显示在左侧，如上实例。
- `.offcanvas-end` 显示在右侧
- `.offcanvas-top` 显示在顶部
- `.offcanvas-bottom` 显示在底部



## Bootstrap5 小工具

>设置不同元素的背景颜色时，需要通过 **.text-\*** 类来设置匹配的文本颜色
>
>**.bg-gradient** 类可以设置背景颜色渐变的效果：

## Bootstrap5 Flex（弹性）布局

>
>
>

## 表单

在本章中，我们将学习如何使用 Bootstrap 创建表单。Bootstrap 通过一些简单的 HTML 标签和扩展的类即可创建出不同样式的表单。

表单元素 **<input>**, **<textarea>**, 和 **<select>** elements 在使用 **.form-control** 类的情况下，宽度都是设置为 100%。

* 堆叠表单

  >```html
  ><div class="container mt-3">
  >  <h2>堆叠表单</h2>
  >	<form action="">
  >	  <div class="mb-3 mt-3">
  >		<label for="email" class="form-label">Email:</label>
  >		<input type="email" class="form-control" id="email" placeholder="Enter email" name="email">
  >	  </div>
  >	  <div class="mb-3">
  >		<label for="pwd" class="form-label">Password:</label>
  >		<input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd">
  >	  </div>
  >	  <div class="form-check mb-3">
  >		<label class="form-check-label">
  >		  <input class="form-check-input" type="checkbox" name="remember"> Remember me
  >		</label>
  >	  </div>
  >	  <button type="submit" class="btn btn-primary">Submit</button>
  >	</form>
  ></div>
  >```

* 内联表单

  >```html
  ><form>
  >  <div class="row">
  >    <div class="col">
  >      <input type="text" class="form-control" placeholder="Enter email" name="email">
  >    </div>
  >    <div class="col">
  >      <input type="password" class="form-control" placeholder="Enter password" name="pswd">
  >    </div>
  >  </div>
  ></form>
  >```

## 输入框大小

我们可以通过在 **.form-control** 输入框中使用 **.form-control-lg** 或 **.form-control-sm** 类来设置输入框的大小:

## 禁用/只读表单

使用 **disabled/readonly** 属性设置输入框禁用/只读：

## 取色器

使用 **.form-control-color** 类可以创建一个取色器：

```html
<div class="container mt-3">
  <h2>取色器</h2>
  <p>使用 .form-control-color 类可以创建一个取色器：</p>
  <form>
    <input type="color" class="form-control form-control-color" value="#CCCCCC">
  </form>
</div>
```

## 下拉菜单

>```html
><div class="container mt-3">
>  <h2>下拉菜单</h2>
>  <p>在 Bootstrap5 中下拉菜单 select 元素可以使用 .form-select 类来渲染 :</p>
>  <form action="">
>    <label for="sel1" class="form-label">单选下拉菜单：</label>
>    <select class="form-select" id="sel1" name="sellist1">
>      <option>1</option>
>      <option>2</option>
>      <option>3</option>
>      <option>4</option>
>    </select>
>    <br>
>    
>    <label for="sel2" class="form-label">多选下拉菜单：</label>
>    <select multiple class="form-select" id="sel2" name="sellist2">
>      <option>1</option>
>      <option>2</option>
>      <option>3</option>
>      <option>4</option>
>      <option>5</option>
>    </select>
>    <button type="submit" class="btn btn-primary mt-3">Submit</button>
>  </form>
></div>
>```
>
>* **disabled** 属性可以禁止下拉菜单被选择：
>
>## 数据列表
>
>Bootstrap 也可以通过 datalist 标签为 <input> 元素设置下拉菜单：
>
>```html
><input class="form-control" list="sites" name="site" id="site">
><datalist id="sites">
>	<option value="Google">
>    <option value="Runoob">
>    <option value="Taobao">
>    <option value="Zhihu">
></datalist>
>```

## 复选框与单选框

.form-check-label 类添加到标签元素，.form-check 容器内添加 .form-check-input 类来设置复选框的样式。

```html
<div class="form-check">
    <input class="form-check-input" type="checkbox" id="check1" name="option1" value="something" checked>
    <label class="form-check-label">Option 1</label>
</div>
```

* 单选框 type= "radio"

* 切换开关

  >如果你想把复选框变成一个可切换的开关，可以在 **.form-check** 容器内使用 **.form-switch** 类:
  >
  >```html
  ><div class="form-check form-switch">
  >    <input class="form-check-input" type="checkbox" id="mySwitch" name="darkmode" value="yes" checked>
  >    <label class="form-check-label" for="mySwitch">Dark Mode</label>
  ></div>
  >```

  ## 选择区间

  >要设置一个选择区间可以在 **input** 元素中添加 **type="range"** 并使用 **.form-range** 类：
  >
  >```html
  ><label for="customRange" class="form-label">Custom range</label>
  ><input type="range" class="form-range" id="customRange">
  >```

  ## 输入框组

  >我们可以使用 **.input-group** 类来向表单输入框中添加更多的样式，如图标、文本或者按钮。
  >
  >**.input-group-text** 类来设置文本的样式。。
  >
  >```html
  ><form>
  >    <div class="input-group mb-3">
  >        <span class="input-group-text">@</span>
  >        <input type="text" class="form-control" placeholder="Username">
  >    </div>
  >    <div class="input-group">
  >    <input type="text" class="form-control" placeholder="Your Email">
  >    <span class="input-group-text">@runoob.com</span>
  >  </div> 
  ></form>
  >```
  >
  >使用 **.input-group-sm** 类来设置小的输入框， **.input-group-lg** 类设置大的输入框：
  >
  >* 输入框添加按钮
  >
  >```html
  ><div class="input-group mb-3 mt-3">
  >    <button class="btn btn-outline-primary" type="button">
  >    	Basic Button    
  >    </button>
  >    <input type="text" class="form-control" placeholder="Some text">
  ></div>
  ><div class="input-group mb-3">
  >    <input type="text" class="form-control" placeholder="Search">
  >    <button class="btn btn-success" type="submit">Go</button> 
  ></div>
  ><div class="input-group mb-3">
  >    <input type="text" class="form-control" placeholder="Something clever..">
  >    <button class="btn btn-primary" type="button">OK</button> 
  >    <button class="btn btn-danger" type="button">Cancel</button> 
  ></div>
  >```



## 表单浮动标签

默认情况下，标签内容一般显示在 input 输入框的上方：

使用浮动标签，可以在 input 输入框内插入标签，在单击 input 输入框时使它们浮动到上方

```html
<div class="form-control mb-3 mt-3">
    <input type="text" class="form-control" id="email" palceholder="Enter email" name="email">
    <label for="email">Email</label>
</div>
<div class="form-control mt-3 mb-3">
    <input type="text" class="form-control" id="pwd" placeholder="Enter password" name="pswd">
    <label for="pwd">Password</label>
</div>

```





## 表单验证

>我们可以使用不同的验证类来设置表单的验证功能。
>
>**.was-validated** 或 **.needs-validation** 添加到 <form> 元素中，input 输入字段将具有绿色（有效）或红色（无效）边框效果，用于说明表单是否需要输入内容。
>
>**.valid-feedback** 或 **.invalid-feedback** 类用来告诉用户缺少什么信息，或者在提交表单之前需要完成什么。
>
>使用 .was-validated 类显示表单在提交之前需要填写的内容：
>
>```html
><form action="" class="was-validated">
>    <div class="form-group">
>    <label for="uname">Username:</label>
>    <input type="text" class="form-control" id="uname" placeholder="Enter username" name="uname" required>
>    <div class="valid-feedback">验证成功！</div>
>    <div class="invalid-feedback">请输入用户名！</div>
>  </div>
>  <div class="form-group">
>    <label for="pwd">Password:</label>
>    <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd" required>
>    <div class="valid-feedback">验证成功！</div>
>    <div class="invalid-feedback">请输入密码！</div>
>  </div>
>  <div class="form-group form-check">
>    <label class="form-check-label">
>      <input class="form-check-input" type="checkbox" name="remember" required> 同意协议
>      <div class="valid-feedback">验证成功！</div>
>      <div class="invalid-feedback">同意协议才能提交。</div>
>    </label>
>  </div>
>  <button type="submit" class="btn btn-primary">提交</button>
></form>
>```
>
>
>
>使用 .needs-validation，它将在表单提交之后验证缺少的内容。这里需要添加一些 JavaScript 代码才能使代码正常工作：
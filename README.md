# layui-csa
+ layui-admin for csa
+ a template of common management system
## 注意事项
> 1. 在登录的时候，会得到一个satoken，用于验证登录，以后的每次请求都要带上这个请求头
>
>    **axios**是在myaxios.js中，通过请求拦截的方式统一进行了添加
>
>    在显示安全等级节点那里，使用了手动加的方法，主要是请求拦截有问题，没解决
>
> 2. 在layui的数据表格中，有一个headers属性可以设置，可以在这里设置satoken
>
> 3. 使用了**localStorage**这个内置对象在页面间传递数据
>
> 4. 为了开发和部署方便，使用**baseUrl**
>
>    **axios**的请求在myaxios.js中设置
>
>    **layui**的数据表格的baseUrl，是在登录成功时通过**localStorage**进行传递
>
> 5. **localStorage**是一个内置对象，和**alert**方法类似，都是在**window**名下，所以也可以`window.localStorage`进行调用
>
>    主要有两个方法：
>
>    ```js
>    // 通过字符串类型的key,获取字符串类型的值
>    localStorage.getItem(String key);
>    // 设置字符串类型的 key-value 对
>    localStorage.setItem(String key, String value);
>    ```
>
>    需要注意：由于value的类型只能是字符串，所以在传递其他类型数据时，存入时要先转成字符串，取出时，要将字符串转化成json 再使用
>
>    转化工具可以使用 **qs** 或者自带的 **JSON**这个内置对象
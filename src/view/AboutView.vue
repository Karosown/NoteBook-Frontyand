<template>
<div id="AboutView">
  <el-container>
    <el-header>
      <br>
      <h1 style="text-align: center">关于我们</h1>
      <el-button type="plain" @click="open" >点击打开 来自开发者的一封信</el-button>
    </el-header>
    <el-main style="margin: auto;margin-top: 50px">
      <el-col :span="24">
        <div class="block">
          <el-timeline>
            <el-timeline-item timestamp="2023/01/16" placement="top">
              <el-card>
                <h6>2023-1-16 10:22 修复Hot界面跳转出错问题，优化渲染速度</h6>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2023/01/16" placement="top">
              <el-card>
                <h6>2023-1-16 修复用户修改日记时需要重新打开才显示文章和标题的BUG</h6>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2023/01/15" placement="top">
              <el-card>
                <h6>2023-1-15 新增笔记版本回退、回滚、旧版本查看功能，修复Hot日记会看到私密日记的Bug</h6>
                <p>用户可以查看到所有权限能看到的日记每次更新记录，包括版本号、修改人、修改时间、所属IP等</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2023/01/14" placement="top">
              <el-card>
                <h6>2023-1-14 新增热门日记推送</h6>
                <p>用户不用登录就可以看到当前热门日记，但是点赞仍然要登录，预热间隔为1小时，默认页从关于界面路由到热门页面</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2023/01/13" placement="top">
              <el-card>
                <h6>2023-1-13 中午12:40-13:00 服务器关闭，进行OSS迁移</h6>
                <p>将日记、头像存储oss迁移至国内，预计16日前将日记版本回滚更新完毕，每个版本有1年的缓存，oss迁移不会影响版本问题</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2023/01/13" placement="top">
              <el-card>
                <h6>2023-1-13 前端新增按钮搜索，搜索图标右移</h6>
                <p>修复在点击”我的日记“时，如果搜索框有文字会无法跳转的bug</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2023/01/11" placement="top">
              <el-card>
                <h6>2023-1-11 笔记数据表新增内容简介</h6>
                <p>新增内容简介，提升用户体验，解决前端显示加载过慢的问题，站点管理员可从前端修改所有日记</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2023/01/11" placement="top">
              <el-card>
                <h6>2023-1-11 前端优化，支持多端自适应（导航栏优化）</h6>
                <p>后端SQL修改，解决定时任务持久化点赞记录而导致日记创建时间被修改的问题</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2023/01/10" placement="top">
              <el-card>
                <h6>用户中心侧栏优化，手机访问自动收敛</h6>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2023/01/09" placement="top">
              <el-card>
                <h6>点赞功能下架，改为收藏功能后重新上线，在个人中心新增收藏列表，进入个人中心点击我的收藏即可查看</h6>
                <p>项目已开源，点击最下方的GitHub即可查看</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2023/01/06" placement="top">
              <el-card>
                <h6>新增点赞功能，后端实现点赞缓存、定时任务以及分布式锁，笔记列表新增查询时骨架屏加载</h6>
                <p>工具类源码已经开源啦，欢迎大家给个Star，KaTool：<a href="https://github.com/Karosown/KaTool" target="_blank">GitHub</a></p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2023/01/03" placement="top">
              <el-card>
                <h6>前端美化，将搜索框和新建笔记放到导航栏，搜索是自动路由到日记中心，PE端自适应优化</h6>
                <p>组件问题搞了好久，Vue全局对象挂载又有问题，无赖用sessionStorage和事件监听</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2023/01/02" placement="top">
              <el-card>
                <h6>新建日记默认由居中改为左靠齐，日记可修改与删除，新增日期显示，项目页面前端优化，修复日记样式问题</h6>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2022/12/31" placement="top">
              <el-card>
                <h6>前端用户初体验日记系统（暂不支持视频上传，可以书写以及查找其他日记，可设置公开或私密）</h6>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2022/12/29" placement="top">
              <el-card>
                <h6>日记系统后端架构完毕</h6>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2022/12/28" placement="top">
              <el-card>
                <h6>日记系统布局</h6>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2022/12/22" placement="top">
              <el-card>
                <h6>用户中心前台与后端对接完毕（待对接），删档内测开放</h6>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2022/12/21" placement="top">
              <el-card>
                <h6>用户中心前后端基础优化</h6>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2022/12/17" placement="top">
              <el-card>
                <h6>用户中心前端基础架构启动</h6>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2022/12/16" placement="top">
              <el-card>
                <h6>用户中心后端基础架构完毕</h6>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2022/12/12" placement="top">
              <el-card>
                <h6>项目立项+前后端架构准备</h6>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-col>
    </el-main>
  </el-container>

</div>
</template>

<script>
export default {
  name: "AboutView",
  data() {
    return {

    }
  },
  methods:{
    open() {
      this.$alert('掌印日记，在后疫情时代，大部分群体的生活压力以及财产压力有明显的增大，并且疫情仍在继续，疫情使部分群体产生抑郁情绪，为此，我制作了这个给大家用于日常生活分享的平台，更多原因可以看我的博文<a href="https://www.wzl1.top/2022/12/2022%e5%b9%b4%e6%9c%ab%e6%80%bb%e7%bb%93/" target="_blank">2022-年末总结</a><br>后端技术栈：SpringBoot、Redis、SpringSession、MyBatis-plus、SpringDataRedis、Swagger（Knife4j）<br>前端技术栈：Vue-2.6.14、Element-UI、Bootstrap-5.2.3、axios<br>工具类：Hutool、KaTool<br>其他：WangEidtor、Prism<br>作者:<a href="https://www.wzl1.top/" target="_blank">Karos</a><br>我们期待您的加入，欢迎从博客中联系我<hr><p style="float:right">头上一片晴天，心中一个想念</p><br>', '这是一个日记网站，记录每一个人的点点滴滴', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        callback:() => {
          this.$message({
            type: 'success',
            message: `感谢您的阅读`,
          });
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
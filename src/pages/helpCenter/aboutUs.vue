<template>
<div class="aboutUs">
    <perHeader></perHeader>
    <div class="container">
                <div class="help_right">
                    <div class="header-img"><img src="../../img/seize/banner-s4.jpg"></div>
                    <div class="box box-between header-box">
                        <div class="about-header">
                            关于我们
                        </div>
                        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                            <el-menu-item index="1">公司简介</el-menu-item>
                            <el-menu-item index="2">招贤纳士</el-menu-item>
                            <el-menu-item index="3">联系方式</el-menu-item>
                        </el-menu>
                    </div>
                    <div class="introduction-box" v-if="activeIndex==1">
                        <p class="f14 mt30">中威网<!-- <span class="colccc">ABOUT CWhisky</span> --></p>
                        <p>中威网（cwhisky）致力于为超过1500万高端注册会员，打造最值得信赖的，全球线上线下精品生活方式平台。集团旗下设有中威网商业、中威网金融和中威网智能三大核心板块。2008年成立至今，中威网集团(CWhisky)已拥有中国地区最大的高端商城，通过互联网（cwhisky.com）、移动客户端（APP）， 在北京、上海、成都、香港、米兰、马来西亚中心地段的体验店，全方位地服务高端人群。同时，建成国内最专业的奢侈品鉴定团队，奢侈品养护工厂。</p>
                        <p>至今已经获得包括IDG、德国贝塔斯曼、森合投资、法国Ventech、日本盘古创富、华人文化产业投资基金、平安创新投资基金等数家风投的5轮投资，融资规模达上亿美元。</p>
                        <p class="f14 mt30">中威网商业</p>
                        <p>中威网商业上拥有箱包、腕表、服饰、高端旅行、珍馐、享乐、艺术品、中国精品、豪车、私人飞机等数十品类与来自全球超过30万件的精品，100%真品保证，已成为中国精品购物第一平台。与超过1000个高端品牌合作，拥有如Versace, Salvatore Ferragamo, Sergio Rossi, La Perla, TAG Heuer(泰格豪雅，隶属LVMH集团），Pomellato(宝曼兰朵，隶属开云集团), Roberto Cavalli, Tod’s、Roger Vivier、Lamborghini等等国际一线品牌的直接授权，带给消费者最安心的消费体验。</p>
                        <p class="f14 mt30">中威网金融</p>
                        <p>中威网金融针对高端用户，通过供应链金融和消费金融，为高端消费者打造便捷、高效的跨境金融消费服务，推出跨境大额支付、多币种换汇、跨境购买退税等服务。</p>
                        <p class="f14 mt30">中威网智能</p>
                        <p>中威网智能利用物联网、智能终端设备、可穿戴设备技术感知用户兴趣，结合大数据行为分析进而了解用户需求，通过一系列智能化手段为用户提供贴身服务及终身呵护。</p>
                        <p>过去9年间，中威网见证及引领了奢侈品在中国的变化，它不再是高高在上挂在金字塔尖的象征物，而成为了承载高端人群生活方式的模版。中威网通过更短的路径触及你想要的商品，通过更专业的服务帮你过滤出最具品位的精品生活方式。中威网的存在，旨在具体化高端生活方式的标准，让消费者拥有更好的生活，也让品牌实现更好的价值。</p>

                        <div class="mt30 img-box box box-center"><img width="100%" src="../../img/company.jpeg"></div>
                        <p class="f14 mt30">CWhisky Group</p>
                        <p>CWhisky Group, an Online-Offline Premium Lifestyle platform, is committed to provide a one-stop life solution for more than 15 million high-end consumers around the world, via 3 core business units, CWhisky Luxe, CWhisky Finance and CWhisky Smart. Established in 2008, CWhisky Luxe now has become the biggest premium online retailer in China, with website CWhisky.com, mobile APP and CWhisky experience centers in prime locations in Beijing, Shanghai, Chengdu, Hong Kong, Milan, and Malaysia. Meanwhile, CWhisky owns the largest luxury authentication team and the largest database of authentication in China. </p>
                        <p>CWhisky has attracted series E investment from various  venture  capital  including  IDG,  Bertelsmann, Crehol, Ventech, Japan Vangoo Capital , CMC and Ping An Ventures since 2011.</p>
                        <p class="f14 mt30">CWhisky Luxe</p>
                        <p>CWhisky Luxe, offers over 200 thousand premium products and services across various categories, including handbags (leather goods), watches, clothes & accessories, premium travelling, fine wine & food, Luxury Automobiles, private jets and etc. with 100% authentic guaranteed. As the biggest premium online shopping platform in China, CWhisky has collaboration with over 1000 international premium brands, and directly co-operated with brands such as Versace, Salvatore Ferragamo, Sergio Rossi, La Perla, Roberto Cavalli, Tod’s, Roger Vivier, Lamborghini, TAG and etc.</p>
                        <p class="f14 mt30">CWhisky Finance</p>
                        <p>CWhisky Finance is an integrated platform, devoted to provide customized financial solution for high-end membership via supply chain finance and retail finance services.</p>
                        <p class="f14 mt30">CWhisky Smart</p>
                        <p>CWhisky Smart provides intelligent customized services via big data analysis based on premium consumers’ habit and behavior.</p>
                    </div>
                    <div class="joy-box" v-if="activeIndex==2">
                        <el-row :gutter="50">
                            <el-col :span="6">
                                <el-menu :default-active="joyIndex" class="el-menu-demo" @select="joySelect">
                                    <el-menu-item index="1">运维开发工程师</el-menu-item>
                                    <el-menu-item index="2">高级安全工程师</el-menu-item>
                                    <el-menu-item index="3">大数据架构师</el-menu-item>
                                    <el-menu-item index="4">WEB前端工程师</el-menu-item>
                                    <el-menu-item index="5">大数据开发</el-menu-item>
                                    <el-menu-item index="6">软件测试工程师</el-menu-item>
                                </el-menu>
                            </el-col>
                            <el-col :span="18">
                                <div v-if="joyIndex==1">
                                    <p>运维开发工程师</p><br/><br/>
                                    <p>岗位职责</p><br/>
                                    <p>1、负责运维管理系统后台脚本编写；</p><br/>
                                    <p>2、负责公司自动化运维和工具建设；</p><br/>
                                    <p>3、协助完成部门内部系统的接口工作。</p><br/><br/>
                                    <p>职位要求</p><br/>
                                    <p>1、有Linux系统运维经验，熟悉Shell脚本以及常用的Linux操作命令；</p><br/>
                                    <p>2、精通Python语言，较强的独立开发能力，具备良好的代码风格，至少2年以上Python开发经验；</p><br/>
                                    <p>3、精通流行的Python web开发框架,如Django、Tornado、Flask 等；</p><br/>
                                    <p>4、熟练使用Javascript、HTML、JSON、YAML、JQuery/CSS；</p><br/>
                                    <p>5、熟悉自动化运维工具puppet、saltstack、Ansible等；</p><br/>
                                    <p>6、热爱开源，喜欢折腾、能够承担工作压力，具备创新思维、具备团队协作精神。</p><br/><br/>
                                    <p>简历请发送至：hrbj@secoo.com</p><br/>
                                </div>
                                <div v-if="joyIndex==2">
                                    <p>高级安全工程师</p><br/><br/>
                                    <p>岗位职责</p><br/>
                                    <p>1、负责运维管理系统后台脚本编写；</p><br/>
                                    <p>2、负责公司自动化运维和工具建设；</p><br/>
                                    <p>3、协助完成部门内部系统的接口工作。</p><br/><br/>
                                    <p>职位要求</p><br/>
                                    <p>1、有Linux系统运维经验，熟悉Shell脚本以及常用的Linux操作命令；</p><br/>
                                    <p>2、精通Python语言，较强的独立开发能力，具备良好的代码风格，至少2年以上Python开发经验；</p><br/>
                                    <p>3、精通流行的Python web开发框架,如Django、Tornado、Flask 等；</p><br/>
                                    <p>4、熟练使用Javascript、HTML、JSON、YAML、JQuery/CSS；</p><br/>
                                    <p>5、熟悉自动化运维工具puppet、saltstack、Ansible等；</p><br/>
                                    <p>6、热爱开源，喜欢折腾、能够承担工作压力，具备创新思维、具备团队协作精神。</p><br/><br/>
                                    <p>简历请发送至：hrbj@secoo.com</p><br/>
                                </div>
                                <div v-if="joyIndex==3">
                                    <p>大数据架构师</p><br/><br/>
                                    <p>岗位职责</p><br/>
                                    <p>1、负责运维管理系统后台脚本编写；</p><br/>
                                    <p>2、负责公司自动化运维和工具建设；</p><br/>
                                    <p>3、协助完成部门内部系统的接口工作。</p><br/><br/>
                                    <p>职位要求</p><br/>
                                    <p>1、有Linux系统运维经验，熟悉Shell脚本以及常用的Linux操作命令；</p><br/>
                                    <p>2、精通Python语言，较强的独立开发能力，具备良好的代码风格，至少2年以上Python开发经验；</p><br/>
                                    <p>3、精通流行的Python web开发框架,如Django、Tornado、Flask 等；</p><br/>
                                    <p>4、熟练使用Javascript、HTML、JSON、YAML、JQuery/CSS；</p><br/>
                                    <p>5、熟悉自动化运维工具puppet、saltstack、Ansible等；</p><br/>
                                    <p>6、热爱开源，喜欢折腾、能够承担工作压力，具备创新思维、具备团队协作精神。</p><br/><br/>
                                    <p>简历请发送至：hrbj@secoo.com</p><br/>
                                </div>
                                <div v-if="joyIndex==4">
                                    <p>WEB前端工程师</p><br/><br/>
                                    <p>岗位职责</p><br/>
                                    <p>1、负责运维管理系统后台脚本编写；</p><br/>
                                    <p>2、负责公司自动化运维和工具建设；</p><br/>
                                    <p>3、协助完成部门内部系统的接口工作。</p><br/><br/>
                                    <p>职位要求</p><br/>
                                    <p>1、有Linux系统运维经验，熟悉Shell脚本以及常用的Linux操作命令；</p><br/>
                                    <p>2、精通Python语言，较强的独立开发能力，具备良好的代码风格，至少2年以上Python开发经验；</p><br/>
                                    <p>3、精通流行的Python web开发框架,如Django、Tornado、Flask 等；</p><br/>
                                    <p>4、熟练使用Javascript、HTML、JSON、YAML、JQuery/CSS；</p><br/>
                                    <p>5、熟悉自动化运维工具puppet、saltstack、Ansible等；</p><br/>
                                    <p>6、热爱开源，喜欢折腾、能够承担工作压力，具备创新思维、具备团队协作精神。</p><br/><br/>
                                    <p>简历请发送至：hrbj@secoo.com</p><br/>
                                </div>
                                <div v-if="joyIndex==5">
                                    <p>大数据开发</p><br/><br/>
                                    <p>岗位职责</p><br/>
                                    <p>1、负责运维管理系统后台脚本编写；</p><br/>
                                    <p>2、负责公司自动化运维和工具建设；</p><br/>
                                    <p>3、协助完成部门内部系统的接口工作。</p><br/><br/>
                                    <p>职位要求</p><br/>
                                    <p>1、有Linux系统运维经验，熟悉Shell脚本以及常用的Linux操作命令；</p><br/>
                                    <p>2、精通Python语言，较强的独立开发能力，具备良好的代码风格，至少2年以上Python开发经验；</p><br/>
                                    <p>3、精通流行的Python web开发框架,如Django、Tornado、Flask 等；</p><br/>
                                    <p>4、熟练使用Javascript、HTML、JSON、YAML、JQuery/CSS；</p><br/>
                                    <p>5、熟悉自动化运维工具puppet、saltstack、Ansible等；</p><br/>
                                    <p>6、热爱开源，喜欢折腾、能够承担工作压力，具备创新思维、具备团队协作精神。</p><br/><br/>
                                    <p>简历请发送至：hrbj@secoo.com</p><br/>
                                </div>
                                <div v-if="joyIndex==6">
                                    <p>软件测试工程师</p><br/><br/>
                                    <p>岗位职责</p><br/>
                                    <p>1、负责运维管理系统后台脚本编写；</p><br/>
                                    <p>2、负责公司自动化运维和工具建设；</p><br/>
                                    <p>3、协助完成部门内部系统的接口工作。</p><br/><br/>
                                    <p>职位要求</p><br/>
                                    <p>1、有Linux系统运维经验，熟悉Shell脚本以及常用的Linux操作命令；</p><br/>
                                    <p>2、精通Python语言，较强的独立开发能力，具备良好的代码风格，至少2年以上Python开发经验；</p><br/>
                                    <p>3、精通流行的Python web开发框架,如Django、Tornado、Flask 等；</p><br/>
                                    <p>4、熟练使用Javascript、HTML、JSON、YAML、JQuery/CSS；</p><br/>
                                    <p>5、熟悉自动化运维工具puppet、saltstack、Ansible等；</p><br/>
                                    <p>6、热爱开源，喜欢折腾、能够承担工作压力，具备创新思维、具备团队协作精神。</p><br/><br/>
                                    <p>简历请发送至：hrbj@secoo.com</p><br/>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="contact-box text-center" v-if="activeIndex==3">
                        <div class="box contact-icon-box">
                            <div class="box-flex box box-center">
                                <div>
            						<img src="../../img/icon/contact-gongsi.png">
            						<h4>公司名称</h4>
            						<p>惠州市中威酒业有限公司</p>
                                </div>
                            </div>
                            <div class="box-flex box box-center">
                                <div>
            						<img src="../../img/icon/contact-dizhi.png">
            						<h4>公司地址</h4>
            						<p>广东省惠州市惠城区江北华贸金融街12号楼103</p>
                                </div>
                            </div>
                            <div class="box-flex box box-center">
                                <div class="">
            						<img src="../../img/icon/contact-tousu.png">
            						<h4>投诉及建议</h4>
            						<p>service@cwhisky.com</p>
                                </div>
                            </div>
                        </div>
                        <div class="box contact-icon-box">
                            <div class="box-flex box box-center">
                                <div class="">
            						<img src="../../img/icon/contact-dianhua.png">
            						<h4>客服热线</h4>
            						<p>400-830-5299</p>
                                </div>
                            </div>
                            <div class="box-flex box box-center">
                                <div class="">
            						<img src="../../img/icon/contact-shijian.png">
            						<h4>工作时间</h4>
            						<p>09:00-18:00</p>
                                </div>
                            </div>
                            <div class="box-flex box box-center">
                                <div class="">
            						<img src="../../img/icon/contact-kefu.png">
            						<h4>微信客服</h4>
            						<p>全年无休，24小时在线</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
    </div>
    <perFooter></perFooter>
</div>
</template>
<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
import leftBar from './leftBar'
export default {
    name: 'aboutUs',
    data() {
        return {
            activeIndex:'1',
            joyIndex:'1',
        }
    },
    components: {
        perHeader,
        leftBar,
        perFooter
    },
    methods:{
        handleSelect:function(e) {
            this.activeIndex=e;
        },
        joySelect:function(e) {
            this.joyIndex=e;
        }
    },
    mounted(){
        this.activeIndex = this.$route.query.id;
    }
}
</script>

<style lang="less" scoped>
@import url('css/helpCenter.less');
</style>

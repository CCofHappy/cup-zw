<template>
    <div class="joinUs">
        <perHeader></perHeader>
        <div class="container">
            <el-row :gutter="20">
                <el-col :span="4">
                    <leftBar :navNum="'53'" :leftIndex="['5']"></leftBar>
                </el-col>
                <el-col :span="20">
                    <div class="help_right">
                        <ul class="b-b-s">
                            <li class="yahei"><strong>中威网</strong></li>
                            <li><strong>技术部：</strong>
                                <a href="#joba1">运维开发工程师</a> <span>|</span>
                                <a href="#joba2">高级安全工程师</a> <span>|</span>
                                <a href="#joba3">大数据架构师</a> <span>|</span>
                                <a href="#joba4">WEB前端工程师</a> <span>|</span>
                                <a href="#joba5">大数据开发</a> <span>|</span>
                                <a href="#joba6">软件测试工程师</a> <span>|</span>
                                <a href="#joba7">高级搜索工程师</a> <span>|</span>
                                <a href="#joba8">IOS开发工程师</a> <span>|</span>
                                <a href="#joba9">用户架构师</a> <span>|</span>
                                <a href="#joba10">接口架构师</a> <span>|</span>
                                <a href="#joba11">高级JAVA工程师（供应链）</a> <span>|</span>
                                <a href="#joba12">高级JAVA工程师（财务系统）</a> <span>|</span>
                                <a href="#joba13">Android开发工程师</a> <span>|</span>
                                <a href="#joba14">高级爬虫工程师</a> <span>|</span>
                                <a href="#joba15">JAVA工程师（支付、账户体系）</a> <span>|</span>
                                <a href="#joba16">移动测试工程师</a>
                            </li>
                            <li><strong>产品部：</strong>
                                <a href="#jobb1">高级产品经理</a> <span>|</span>
                                <a href="#jobb3">交互设计师</a> <span>|</span>
                            </li>
                            <li><strong>视觉中心：</strong>
                                <a href="#jobd1">资深视觉设计师</a> <span>|</span>
                                <a href="#jobd2">资深UI设计师</a>
                            </li>
                        </ul>
                        <dl id="joba1" class="mar-top-10">
                            <dt>运维开发工程师</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>1、负责运维管理系统后台脚本编写；</dd>
                            <dd>2、负责公司自动化运维和工具建设；</dd>
                            <dd>3、协助完成部门内部系统的接口工作。</dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1、有Linux系统运维经验，熟悉Shell脚本以及常用的Linux操作命令；</dd>
                            <dd>2、精通Python语言，较强的独立开发能力，具备良好的代码风格，至少2年以上Python开发经验；</dd>
                            <dd>3、精通流行的Python web开发框架,如Django、Tornado、Flask 等；</dd>
                            <dd>4、熟练使用Javascript、HTML、JSON、YAML、JQuery/CSS； </dd>
                            <dd>5、熟悉自动化运维工具puppet、saltstack、Ansible等；</dd>
                            <dd>6、热爱开源，喜欢折腾、能够承担工作压力，具备创新思维、具备团队协作精神。</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="joba2" class="mar-top-10">
                            <dt>高级安全工程师</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>1、对公司网站、业务系统进行安全评估测试；</dd>
                            <dd>2、负责日常安全测试、漏洞跟踪处理；</dd>
                            <dd>3、负责公司安全事件分析处理，能及时响应安全事件。</dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1、对常见的Web安全漏洞的原理、危害、利用方式及修复方案有深入理解；</dd>
                            <dd>2、熟练使用主流的安全工具，可独立完成Web安全测试工作，并根据实际情况提供最佳解决方案；</dd>
                            <dd>3、熟悉掌握java、jsp、php任意一种语言，可做源码审计，并可以开发简单的安全工具；</dd>
                            <dd>4、有责任心和职业道德，具备良好的团队合作沟通能力，对安全工作有热情,对未知技术和领域能快速掌握并实践；</dd>
                            <dd>5、有安全厂商渗透测试工作经验优先。</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="joba3" class="mar-top-10">
                            <dt>大数据架构师</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>1、参与公司大数据的部署和开发；</dd>
                            <dd>2、根据总体设计和软件需求完成详细设计、代码编写和单元测试；</dd>
                            <dd>3、配合技术总监完成任务目标；</dd>
                            <dd>4、维护线上系统。</dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1、有较扎实的Java语言基础，熟悉Java IO、多线程、JVM原理及运行机制和内存管理；</dd>
                            <dd>2、熟悉Hadoop生态环境体系的搭建、管理和开发，有实际的的集群搭建、调优经验和开发经验；</dd>
                            <dd>3、熟悉Hadoop、Hive、Hbase、mahout等分布式计算框架，熟悉MapReduce编程；</dd>
                            <dd>4、熟悉shell、python等开发脚本；</dd>
                            <dd>5、熟悉YARN 、Storm、Spark等分布式框架者优先；</dd>
                            <dd>6、有用户行为分析、智能搜索、推荐算法、精准广告算法或机器学习、数据挖掘的经验；</dd>
                            <dd>7、懂用户行为追踪技术（APP埋点等）的申请者优先。</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="joba4" class="mar-top-10">
                            <dt>WEB前端工程师</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>1、负责web前端开发；</dd>
                            <dd>2、负责前端页面构建，将设计图转化成页面，实现前端展示效果和交互功能。</dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1、计算机相关专业，3年以上web前端开发工作经验；</dd>
                            <dd>2、熟悉HTML5，CSS3，JavaScript/Jquery/Zepto，Ajax等网页技术；</dd>
                            <dd>3、熟练用JS做出各种特效及交互功能；</dd>
                            <dd>4、具有良好的自主学习能力、抗压能力、沟通能力和团队精神。</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="joba5" class="mar-top-10">
                            <dt>大数据开发</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>1、负责搭建hadoop集群，并维护与管理；</dd>
                            <dd>2、负责hadoop平台上的数据存储，数据维护和优化；</dd>
                            <dd>3、负责网站及APP的用户访问行为日志分析；</dd>
                            <dd>4、编写一些hive等分析脚本；</dd>
                            <dd>5、负责把一些分析结果导入到数据库中,为bi提供基础数据分析。</dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1、本科以上学历，3年以上相关工作经验；</dd>
                            <dd>2、对数据结构、算法有深刻理解；</dd>
                            <dd>3、熟悉linux开发环境；</dd>
                            <dd>4、熟悉python、shell、perl中的一种；</dd>
                            <dd>5、有hadoop集群部署和开发经验；</dd>
                            <dd>6、熟悉kafka,storm,hive,spooq,flume；</dd>
                            <dd>7、熟悉java开发。</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="joba6" class="mar-top-10">
                            <dt>软件测试工程师</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>1、根据概要需求估算测试规模及工作量；</dd>
                            <dd>2、参与需求评审；</dd>
                            <dd>3、制定测试计划；</dd>
                            <dd>4、根据需求分析测试需求；</dd>
                            <dd>5、测试设计及测试用例编写；</dd>
                            <dd>6、测试执行及缺陷管理；</dd>
                            <dd>7、测试报告编写及漏测分析；</dd>
                            <dd>8、度量数据的收集及分析；</dd>
                            <dd>9、在整个测试阶段，负责软件质量相关活动，确保计划等到高质量的执行并符合相关质量目标；</dd>
                            <dd>10、测试新技术和方法预研。</dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1、本科及以上学历，计算机相关专业，3年以上测试经验；</dd>
                            <dd>2、能看懂技术英文资料；</dd>
                            <dd>3、掌握测试设计过程，精通测试设计方法；</dd>
                            <dd>4、了解需求开发活动，熟悉需求评审方法，能从业务及系统角度提出有价值问题；</dd>
                            <dd>5、掌握测试目的的意义，能针对各种项目选择合适的策略；</dd>
                            <dd>6、精通测试分析及设计方法；</dd>
                            <dd>7、掌握测试执行过程，能进行有效发散的测试，能进行缺陷的初步定位；</dd>
                            <dd>8、精通缺陷管理流程，在缺陷管理过程中起到积极作用；</dd>
                            <dd>9、系统质量评估能力；</dd>
                            <dd>10、熟悉度量的过程及方法，熟悉度量数据收集分析；</dd>
                            <dd>11、对测试模型有深刻认识，熟悉行业质量模型，良好的质量知识；</dd>
                            <dd>12、熟悉一种脚本语言；</dd>
                            <dd>13、能编写常用SQL语句进行DQL/DML操作；</dd>
                            <dd>14、测试领域新知识学习及应用能力；</dd>
                            <dd>15、熟悉WEB测试及典型WEB三层架构；</dd>
                            <dd>16、有互联网项目测试经验；</dd>
                            <dd>17、有大型系统后端测试经验；</dd>
                            <dd>18、精通Java语言，有开发经验。</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="joba7" class="mar-top-10">
                            <dt>高级搜索工程师</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>1、负责公司商城相关搜索产品的开发和维护；</dd>
                            <dd>2、根据总体设计和软件需求完成详细设计、代码编写、单元测试和联调测试；</dd>
                            <dd>3、线上系统的维护。</dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1、 熟悉java，三年以上java搜索项目项目开发经验；</dd>
                            <dd>2、 熟悉solr、lucene以及搜索原理；</dd>
                            <dd>3、 熟悉分布式缓存，队列，消息机制；</dd>
                            <dd>4、 熟悉linux环境的开发，调式和部署；</dd>
                            <dd>5、有大数据处理经验，有python使用经验，推荐系统开发经验者优先；</dd>
                            <dd>6、有互联网，大型网站开发经验者优先。</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="joba8" class="mar-top-10">
                            <dt>IOS开发工程师</dt>
                            <dd>负责中威网商城或中威网金融平台的开发</dd>
                            <dd><strong>任职资格</strong></dd>
                            <dd>1、本科以上学历，较强的软件设计，研发能力，3年以上 IOS研发经验</dd>
                            <dd>2、熟悉 iOS平台 UI设计，尤其对 UIKit framework 有清晰的理解，能够熟练编写自定义控件和常用动画效果</dd>
                            <dd>3、熟悉 iOS系统及常用的 framework，对内存管理、对象生命周期有清晰的认识</dd>
                            <dd>4、对 Objective-C有深入的理解，理解面向对象设计的基本原则，熟悉常用的设计模式及算法</dd>
                            <dd>5、熟悉常见的网络协议</dd>
                            <dd>6、有强烈的责任心和团队精神，善于沟通和合作；能独立完成设计和编码</dd>
                            <dd>7、对iOS的UI控件有优化经验者优先；有前端开发经验者优先</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="joba9" class="mar-top-10">
                            <dt>用户架构师</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>1.制定passport、会员(用户)账户系统架构设计；</dd>
                            <dd>2.负责应用系统基础架构、核心功能设计、开发；</dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1.有passport、会员(用户)账户系统设计经验。</dd>
                            <dd>2.三年以上开发经验，有电商行业经验。</dd>
                            <dd>3.熟悉oracle,mysql等关系数据库, 熟悉缓存Redis、Memcache、消息中间件、异步等技术，熟悉RPC、TCP/IP、HTTP协议。</dd>
                            <dd>4.Java基础扎实，熟练掌握jsp/servlet，熟悉常用框架。熟悉JavaScript、jquery技术。</dd>
                            <dd>5.熟悉高并发、高性能、可扩展、分布式系统的设计及应用经验。</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="joba10" class="mar-top-10">
                            <dt>接口架构师</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>1.制定接口技术方案及标准、实现易扩展；</dd>
                            <dd>2.负责应用系统基础架构、核心功能设计、开发；</dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1.三年以上无线(app)接口设计开发经验，有电商行业经验。</dd>
                            <dd>2.熟悉oracle,mysql等关系数据库, 熟悉缓存Redis、Memcache、消息中间件、异步等技术，熟悉RPC、TCP/IP、HTTP协议。</dd>
                            <dd>3.Java基础扎实，熟练掌握jsp/servlet，熟悉常用框架。</dd>
                            <dd>4.熟悉高并发、高性能、可扩展、分布式系统的设计及应用经验。</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="joba11" class="mar-top-10">
                            <dt>高级JAVA工程师（供应链）</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>1.深入理解业务（供应链物流相关业务），参与需求分析,为业务开发提供架构设计；</dd>
                            <dd>2. 根据项目计划书或项目经理要求组织实施项目的技术落实与维护； </dd>
                            <dd>3. 负责编写相关模块概要设计、详细设计等技术文档； </dd>
                            <dd>4. 参与项目中业务功能接口协议和基础类库的设计，解决项目中的关键问题和技术难题； </dd>
                            <dd>5. 配合项目经理和测试人员，共同完成系统开发；</dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1. 本科以上学历，计算机相关专业，4年以上开发工作经验；</dd>
                            <dd>2. 熟练应用J2EE的相关开发技术：Jsp，Servlet，Spring，Mybatis，JDBC，JQuery，Json等和设计模式优先；</dd>
                            <dd>3. 熟悉应用服务器和开发工具, 如 Tomcat /Eclipse 等, 能对目标系统进行优化配置;</dd>
                            <dd>4. 熟悉MySQL数据库开发，有较好的数据库设计能力；</dd>
                            <dd>5. 有责任感，较强的沟通协调能力，具有团队合作精神並敢于承担责任，独立或合作解决技术难题；</dd>
                            <dd>6. 大型电商公司有供应链、ERP、物流工作经验。</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="joba12" class="mar-top-10">
                            <dt>高级JAVA工程师（财务系统）</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>1.负责中威网财务系统开发</dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1. 本科以上学历，计算机相关专业，4年以上开发工作经验；</dd>
                            <dd>2. 熟练应用J2EE的相关开发技术：Jsp，Servlet，Spring，Mybatis，JDBC，JQuery，Json等和设计模式优先；</dd>
                            <dd>3. 熟悉应用服务器和开发工具, 如 Tomcat /Eclipse 等, 能对目标系统进行优化配置;</dd>
                            <dd>4. 熟悉MySQL数据库开发，有较好的数据库设计能力；</dd>
                            <dd>5. 有责任感，较强的沟通协调能力，具有团队合作精神並敢于承担责任，独立或合作解决技术难题；</dd>
                            <dd>6. 大型电商公司财务系统开发经验，经历上市财务系统开发经验优先。</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="joba13" class="mar-top-10">
                            <dt>Android开发工程师</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>1．负责Android平台客户端的开发和维护工作；</dd>
                            <dd>2．持续的优化相关的产品的质量、性能、用户体验；</dd>
                            <dd>3．参与Android平台客户端的设计。</dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1．4年工作经验，其中3年以上Android软件开发经验；</dd>
                            <dd>2．具备扎实的Java开发基础；熟悉Android平台下UI设计和实现；熟悉Android操作系统，熟悉Android SDK,具备性能调优能力；</dd>
                            <dd>3．对数据结构和算法等有优秀的编写和设计能力。</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="joba14" class="mar-top-10">
                            <dt>高级爬虫工程师</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>1、对指定网站进行数据抓取，清洗以及汇总的开发工作。 </dd>
                            <dd>2、互联网网站，网页，链接的特征挖掘。 </dd>
                            <dd>3、负责系统日常运营资源调度优化及运营指标分析调优，并能实时监控爬虫的进度和警报反馈。 </dd>
                            <dd>4、负责特殊网页采集任务的分析及采集方案设计。 </dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1、4年以上JAVA开发经验，精通JAVA网络编程，熟悉HTTP传输协议，能模拟浏览器操作爬虫。 </dd>
                            <dd>2、精通网页抓取原理及技术，精通正则表达式，从结构化的和非结构化的数据中获取信息。 </dd>
                            <dd>3、熟悉多线程编程</dd>
                            <dd>4、至少精通一种关系型数据库的开发，如MYSQL、ORACLE、MSSQL等。 </dd>
                            <dd>5、有爬虫，信息抽取，文本分类相关经验者优先；</dd>
                            <dd>6、有责任心，学习能力强，具有良好的团队合作精神，对工作有热情。</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="joba15" class="mar-top-10">
                            <dt>JAVA工程师（支付、账户体系）</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>1、参与公司产品和项目的设计与开发；</dd>
                            <dd>2、根据总体设计和软件需求完成详细设计、代码编写和单元测试</dd>
                            <dd>3、配合产品经理完成任务目标；</dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1、计算机相关专业大学本科以上学历，3年以上开发经验；</dd>
                            <dd>2、熟悉java语言开发，java基础扎实，熟悉J2EE规范与设计模式；</dd>
                            <dd>3、精通基于Web应用的java编程，熟练掌握jsp/Servlet、Jdbc、JavaScript、css、html；</dd>
                            <dd>4、熟练掌握Spring，mybatis开发技术,熟悉SpringMVC、Struts等MVC框架之一</dd>
                            <dd>5、熟悉SQL语言，熟练掌握Oracle数据库，了解MySQL数据库；</dd>
                            <dd>6、熟悉redis等nosql数据库；；</dd>
                            <dd>7、熟悉UML，熟悉rose、EA、visio等常用设计工具之一</dd>
                            <dd>8、熟悉WebService，XML相关处理</dd>
                            <dd>9、有良好的编码、注释习惯，了解基本的java、数据库优化方式或原理</dd>
                            <dd>10、有责任心，学习能力强，具有良好的团队合作精神，对工作有热情。</dd>
                            <dd>11、有大型互联网公司开发经验者优先；</dd>
                            <dd>12、有会员，账户，支付行业工作经验者优先；</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="joba16" class="mar-top-10">
                            <dt>移动测试工程师</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>1、参与产品测试的全流程，包括需求分析、设计评审，制定测试计划并评估风险；</dd>
                            <dd>2、独立执行项目测试，构建测试环境，设计和执行测试用例，进行缺陷跟踪和软件质量分析等；</dd>
                            <dd>3、与项目组成员进行积极有效沟通，推动问题解决；</dd>
                            <dd>4、协助产品人员进行用户验收测试；</dd>
                            <dd>5、执行测试流程，并对工作流程的改进提出建设性的意见。</dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1、工作2年以上，至少经历过一年以上的大型项目或者产品的测试；</dd>
                            <dd>2、具有良好的沟通协调和文档撰写能力；</dd>
                            <dd>3、热爱测试工作，善于发现、分析和总结问题，责任心强，吃苦耐劳，具备较强的沟通能力，有抗压能力，能适应高强度的工作；</dd>
                            <dd>4、学习能力强，能承受一定工作压力，富有团队精神，有责任心，良好的沟通能力；</dd>
                            <dd>5、熟悉移动产品相关开发技术优先，包括IOS／Android／H5页面相关的技术等；</dd>
                            <dd>6、有自动化测试工作经验优先（GUI或者API，开发平台不限）；</dd>
                            <dd>7、-熟悉C/C++/OC/Java或一种脚本语言如python/ruby/perl 等，能熟练编写测试代码优先；</dd>
                            <dd>8、有性能测试经验优先。</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="jobb1" class="mar-top-10">
                            <dt>高级产品经理</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>1、结合公司发展战略，负责策划及统筹相关产品线的发展规划，明晰定位、目标、策略并落实实施；</dd>
                            <dd>2、对网站产品各项数据指标的实现负责，协调产品线内外部关系、合理分配资源确保完成公司下达的年度工作目标；</dd>
                            <dd>3、把握互联网发展趋势，分析跟踪竞争对手，定期完成分析报告或产品竞争战略和计划；</dd>
                            <dd>4、主要负责后台供应链，ERP,财务，WMS其中某一产品线的工作；</dd>
                            <dd>5、负责提出新产品创意，组织、参与、指导产品市场调研和产品规划，并制定推广策略；</dd>
                            <dd>6、负责建立规范、高效的产品管理体系和相关制度并优化完善；</dd>
                            <dd>7、整体负责公司产品研发的相关管理工作，制定产品项目管理流程，并协调其他部门，确保项目按时保质完成。</dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1、4年以上大型互联网企业产品工作经验经验；</dd>
                            <dd>2、具备很强的行业理解能力，熟悉互联网环境，对市场发展趋势有敏锐的洞察力和创新意识；</dd>
                            <dd>3、深刻理解互联网行业产品发展动态及竞争对手的最新动态；</dd>
                            <dd>4、有较强的项目推进能力；</dd>
                            <dd>5、熟悉互联网行业的各个环节，掌握各环节工作流程；</dd>
                            <dd>6、具有较强的领导和组织协调能力、判断力与决策能力，优秀的沟通能力、计划与执行能力，具备突出的团队合作精神。</dd>
                            <dd>7、有相关工作经验者优先考虑；此职位需要有成功案例;</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="jobb3" class="mar-top-10">
                            <dt>交互设计师</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>1、负责界面视觉引导，原型设计；</dd>
                            <dd>2、带领团队，画出原型，参与产品整个的周期；</dd>
                            <dd>3、负责生成视窗口规范，图形化的布局等；</dd>
                            <dd>4、同产品经理和ui一起制订符合标准的内部设计流程；</dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1、美术或设计相关专业毕业，大学本科及以上学历；</dd>
                            <dd>2、3年以上产品交互界面设计经验以及UED相关工作经验，有大型网站工作经验优先；</dd>
                            <dd>3、良好的审美观和创新能力、优秀的设计创意能力，对视觉设计、色彩有敏锐的观察力及分析能力。有自己独特的设计见解和风格；</dd>
                            <dd>4、有很强的学习能力和敬业精神，良好的沟通能力、良好的团队协作精神。</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="job1913" class="mar-top-10">
                            <dt>高级SEO</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>1、能够根据公司战略发展要求，通过各种数据分析，制定整站SEO优化方案，监督执行和效果检查；</dd>
                            <dd>2、分析网站及各频道的关键词解决方案，监控网站关键字，监控和研究竞争对手及其他网站相关做法，并围绕优化提出合理的网站调整建议；</dd>
                            <dd>3. 建立内部SEO标准，把握SEO的发展方向，分析和总结竞争对手的SEO方法，并合理运用，不断提高网站的SEO效果</dd>
                            <dd>4.根据公司网站结构，制作网站地图，剔除网站架构不良设计、实现树状目录结构、使网站导航与链接不断优化，对搜索引擎更加友好化。</dd>
                            <dd>5、跟踪并深入研究Google、Yahoo、Bing的排名机制和优化规则，熟悉各大搜索引擎蜘蛛爬行的规律规则及原理，对SEO有独到的认知与见解</dd>
                            <dd>6、熟悉网站的全面seo优化、SEM方案的制定与分析，网站的各种流量推广方案的执行与跟踪。按阶段汇报优化监控结果和研究结果。</dd>
                            <dd>7、熟悉各种网络推广手段，注重内/外链的建设，拥有丰富的外链获取经验，能够快速高效的获得优质外链资源。</dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1、熟悉各种网络推广手段，4年以上SEO工作经验，能够承受各种SEO的数据指标；</dd>
                            <dd>2、深入了解搜索引擎原理，熟悉google、yahoo、baidu.msn、alexa优化及排名技巧和原理，有多个网站成功案例；</dd>
                            <dd>3、熟悉使用SEO工具,能针对关键词优化进行合理内容设计；</dd>
                            <dd>4、了解各类搜索引擎如何抓取互联网页面、如何进行索引以及如何确定其对某一特定关键词的搜索结果排名等技术；</dd>
                            <dd>5、熟悉 HTML 、CSS 等页面语言；</dd>
                            <dd>6、良好的沟通及协调能力，良好的项目管理能力。能够独立工作，并承受较大工作压力；</dd>
                            <dd>7、具备高度的责任心、诚信的工作作风，注重团队合作。</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="jobd1" class="mar-top-10">
                            <dt>资深视觉设计师</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>1.负责中威网运营活动视觉设计，提供大活动视觉创意及设计方案；</dd>
                            <dd>2.与运营经理及前端工程师配合，从视觉及交互上打造用户购物体验氛围；</dd>
                            <dd>3.根据要求完成有效的设计，保持高水准的设计品质；</dd>
                            <dd>4.持续关注设计趋势，分享设计经验、推动提高团队的设计能力。</dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1.3年以上设计经验；</dd>
                            <dd>2.熟练掌握相关设计工具软件，具有较强的动手能力，有手绘或者插画经验优先；</dd>
                            <dd>3.具有深厚的设计表现力及创新能力，善于沟通，性格随和，良好的团队合作能力；</dd>
                            <dd>4.具有奢侈品，地产经验领域设计优先。</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="jobd2" class="mar-top-10">
                            <dt>资深UI设计师</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>负责中威网线上前台及后台UI设计，并为公司新产品与新功能提供创意及设计方案；</dd>
                            <dd>与产品经理，前端工程师配合，持续提升产品的用户体验；</dd>
                            <dd>根据需求完成有效的设计，保持高水准的设计品质； </dd>
                            <dd>持续关注设计趋势，分享设计经验、推动提高团队的设计能力。</dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1.2年以上大型网站UI经验； </dd>
                            <dd>2.熟练掌握相关设计工具软件，具有较强的动手能力，有手绘或者插画经验优先；</dd>
                            <dd>3.具有深厚的设计表现力及创新能力，善于沟通，性格随和，良好的团队合作能力；</dd>
                            <dd>4.像素眼，强迫症优先。</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="jobrlzyzg" class="mar-top-10">
                            <dt>人力资源主管</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>1、 协助建立人力资源招聘体系，完善人力资源管理政策、制度和流程；</dd>
                            <dd>2、根据公司人力资源规划和部门需求，编制需求和招聘计划，报批后实施；</dd>
                            <dd>3、发展和维护公司的招聘渠道，并通过各种渠道，为公司及时招聘到适合的人才。</dd>
                            <dd>4、负责简历筛选、分类及面试过程的组织、协调，及时满足用人部门的需求。</dd>
                            <dd>5、入职、离职、转正、职务任免、调配、劝退解聘等申请报批手续；</dd>
                            <dd>6、负责公司员工关系管理，调动员工的积极性，协助企业文化建设</dd>
                            <dd>7、协助组织制定、执行、监督公司人力资源管理制度；</dd>
                            <dd>8、完成成人力资源部经理交办的其他相关工作。</dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1、熟悉人力资源各个工作模块，至少精通招聘、员工关系或绩效管理等两个模块；</dd>
                            <dd>2、工作积极主动，责任心、执行力强，能够适应高效率的工作环境；</dd>
                            <dd>3、有大局观，团队协作精神强，具有较强的抗压能力；</dd>
                            <dd>4、优秀的组织、协调和沟通能力，和良好的语言、书面表达能力；</dd>
                            <dd>5、责任心强，有很强的执行力，具备独立分析、解决问题的能力；</dd>
                            <dd>6、正规院校大专以上学历，人力资源管理、行政管理、经济管理等相关专业毕业； </dd>
                            <dd>7、3年以上人力资源工作经验</dd>
                            <dd>8、英语听说能力优秀，会粤语优先。</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="job68" class="mar-top-10">
                            <dt>前台接待 1名</dt>
                            <dd><strong>岗位职责</strong></dd>
                            <dd>1.接听电话，负责访客来宾的登记、接待、引见，做好工作信息的记录、整理、建档</dd>
                            <dd>2.配合接待主管完成部分文件的打印、复印、文字工作</dd>
                            <dd>3.负责管理前台办公用品及办公设备的清洁保养</dd>
                            <dd>4.对工作中出现的各种问题及时汇报，提出工作改进意见</dd>
                            <dd>5.熟练掌握公司概括，能够回答客人提出的一般性问题，提供常规的非保密信息</dd>
                            <dd>6.完成领导交办的其他或临时工作</dd>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1.熟练使用Word、Excel等办公软件，会借助互联网查找资料</dd>
                            <dd>2.具有优秀的中英文书写能力、表达能力</dd>
                            <dd>3.具有良好的沟通能力、协调能力，及较强的保密意识</dd>
                            <dd>4.熟练使用各种办公自动化设备</dd>
                            <dd>5.具有良好的适应能力，能在压力下工作</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                        <dl id="job75" class="mar-top-10">
                            <dt>保洁 2名</dt>
                            <dd><strong>职位要求</strong></dd>
                            <dd>1.男女不限 50岁以下</dd>
                            <dd>2.工作认真仔细，任劳任怨</dd>
                            <dd>3.有相关工作经验优先</dd>
                            <dd class="font-c-yellow"><strong>简历请发送至：<font class="font-f">hrbj@secoo.com</font></strong></dd>
                        </dl>
                    </div>
                </el-col>
            </el-row>
        </div>
        <perFooter></perFooter>
    </div>
</template>
<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
import leftBar from './leftBar'
export default {
    name: 'joinUs',
    data() {
        return {}
    },
    components: {
        perHeader,
        leftBar,
        perFooter
    },
    methods: {}
}
</script>
<style lang="less" scoped>
@import url('css/helpCenter.less');
</style>
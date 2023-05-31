import React from "react";
import "./About.css"
import { Footer } from "rd-component";

const About: React.FC = () => {
  return (
    <div className="about-container">
      <div className="about-intro">
      这个简历自动生成的网站采用了LaTeX渲染技术，为您打造一个专业、高效、美观的简历。用户只需要填写一些基本的个人信息和教育背景、工作经历等简历内容，网站就可以自动生成各式各样的简历模板，并提供下载。不仅如此，该网站还提供了一些排版调整的选项，可以让用户自由选择标题字体、间距等细节，并优先考虑各种考虑用人单位品味的排版方式。这个简历自动生成网站将为各位求职者打破简历制作的烦恼，帮助您更快速、更准确地展示自身的经历与能力，提高求职应聘的成功率。
      </div>
      <Footer></Footer>
    </div>
  );
}

export default About;
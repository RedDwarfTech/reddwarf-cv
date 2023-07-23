import { Button, Input, message } from "antd";
import { useState } from "react";
import './Feedback.module.css';
import { ResponseHandler } from "rdjs-wheel";
import { submitFeedback } from "@/service/user/FeedbackService";
import { UserService, withConnect } from "rd-component";

const Feedback: React.FC = () => {

    const [feedbackValue, setFeedbackValue] = useState('');

    function handleInputChange(event: any) {
        setFeedbackValue(event.target.value);
    }

    const handleFeedback = () => {
        if (!UserService.isLoggedIn()) {
            message.warning("请登录后提交反馈");
        }
        if (feedbackValue == null || feedbackValue.length == 0) {
            return;
        }
        const params = {
            feedback: feedbackValue
        };
        submitFeedback(params).then((data) => {
            if (ResponseHandler.responseSuccess(data)) {
                message.info("提交成功");
            }
        });
    }

    return (
        <div id="feedback">
            <p>您可以反馈使用问题、建议。</p>
            <div className="feedback-area">
                <Input onChange={handleInputChange} placeholder="请输入反馈内容"></Input>
                <Button type="primary" onClick={handleFeedback} className="feedback-submit">提交反馈</Button>
            </div>
            <div>您也可以直接发邮件到jiangtingqiang@gmail.com</div>
        </div>
    );
}

export default withConnect(Feedback);


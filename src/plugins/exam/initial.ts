import { getAccountAndPassword, handleUnitTest, smoothAlert, handleExerciseExam } from "./main";

if (location.href.includes("sso.unipus.cn/sso/login")) {
    setTimeout(getAccountAndPassword, 500);
}

setInterval(smoothAlert, 2000);
setTimeout(() => {
    handleUnitTest();
    handleExerciseExam();
}, 2000);

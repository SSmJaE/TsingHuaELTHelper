import swal from "sweetalert";
import { Requests } from "@utils/requests";
import { setValue } from "@utils/common";

export function getAccountAndPassword() {
    const loginEnter = document.getElementById("login") as HTMLElement;
    loginEnter.innerText = "点我登录\n（鼠标点击，不要回车）";
    loginEnter.addEventListener(
        "click",
        async () => {
            await setValue("xiaorui", {
                username: (document.getElementsByName("username")[0] as HTMLInputElement).value,
                password: (document.getElementsByName("password")[0] as HTMLInputElement).value,
            });
        },
        false,
    );
}

export function handleUnitTest() {
    const url = window.location.href;
    if (url.includes("uexercise.unipus.cn/uexercise/api/v2/enter_unit_test")) {
        Requests.getUnitTestAnswers(url);
    }
}

// enter_check_student_exam_detail?plf=0&schoolId=8321&clsId=305531&studentId=9933404
// &exerciseId=1997236&forwardUrl=https%3A%2F%2Fuexercise.unipus.cn%2Fuexercise%2Fapi%2Fv1%2F
// enter_check_student_exam_detail%3Fplf%3D0%26schoolId%3D8321%26clsId%3D305531%26studentId%3D9933404%26exerciseId%3D1997236&exerciseType=2&sign=A0B2A7330B6A259F3582F88D1600BEE0
export function handleExerciseExam() {
    const url = window.location.href;
    if (
        url.includes("uexercise.unipus.cn/uexercise/api/v1/enter_exercise_exam") ||
        url.includes("uexercise.unipus.cn/uexercise/api/v1/enter_check_student_exam_detail?")
    ) {
        Requests.getClassTestAnswers(url);
    }
}

export function smoothAlert() {
    let button = document.querySelector("#pageLayout div.main button") as HTMLElement;
    if (button !== null && button.textContent === "开始做题") {
        swal("温馨提示", "请耐心等待【开始做题】 变为：【载入完成 点击进入】", "warning");
        let now_course = (document.querySelector("#header ul") as HTMLElement).innerText.split(
            "\n",
        );
        console.log("课程名：", now_course);
        button.innerText = "载入完成\n 点击进入";
    }
}

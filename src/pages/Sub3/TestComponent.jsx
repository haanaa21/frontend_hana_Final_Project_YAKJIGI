
import axios from "axios";


async function TestComponent() {
  try {
    const response = await axios.get("http://localhost:8080/api/test");
    console.log(response.data); // 성공 메시지 출력
  } catch (error) {
    console.error("Error connecting to Spring Boot:", error);
  }
}


export default TestComponent;
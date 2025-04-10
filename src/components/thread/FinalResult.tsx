import { Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

const FinalResult = ({ initialResult }: { initialResult: string }) => {
  const [result, setResult] = useState(initialResult);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      message.success("복사되었습니다!");
    } catch (err) {
      message.error("복사에 실패했어요 🥲");
    }
  };

  return (
    <div>
      <TextArea
        value={result}
        onChange={(e) => setResult(e.target.value)}
        autoSize={{ minRows: 3 }}
      />
      <Button onClick={handleCopy}>결과 복사하기</Button>
    </div>
  );
};

export default FinalResult;

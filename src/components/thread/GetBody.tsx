import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { z } from "zod";
import { BaseSteps } from "./GetFirstSentence";
import { Button } from "antd";

const schema = z.object({
  selected: z.string().min(1, "하나 이상 선택해주세요!"),
});

type FormData = z.infer<typeof schema>;

const GetBody = ({ step }: BaseSteps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { selected: "" },
  });

  const onSubmit = (data: FormData) => {
    console.log("선택된 항목:", data.selected);
  };

  const tags = ["example1", "example2", "example3"];
  return (
    <Wrapper $isVisible={step >= 4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="selected"
          control={control}
          render={({ field }) => (
            <div style={{ display: "flex", gap: 8 }}>
              {tags.map((tag) => (
                <Button
                  key={tag}
                  onClick={() => field.onChange(tag)}
                  style={{
                    padding: 10,
                    border:
                      field.value === tag ? "2px solid blue" : "1px solid gray",
                    background: field.value === tag ? "#e0f0ff" : "#fff",
                  }}
                >
                  {tag}
                </Button>
              ))}
            </div>
          )}
        />
        {errors.selected && (
          <p style={{ color: "red" }}>{errors.selected.message}</p>
        )}

        <Button htmlType="submit">스레드 내용 만들기</Button>
      </form>
    </Wrapper>
  );
};

export default GetBody;

const Wrapper = styled.div<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
`;

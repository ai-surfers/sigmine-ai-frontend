import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { z } from "zod";
import { Button, Flex, Spin } from "antd";
import { RefType } from "@/types/threads";
import Title from "antd/es/typography/Title";
import { usePostFullContents } from "@/hooks/mutations/usePostFullContents";
import FinalResult from "./FinalResult";
import { useScrollBottom } from "@/hooks/useScrollBottom";
import { useThreads } from "@/hooks/useThreads";

const schema = z.object({
  selected: z.string().min(1, "하나 이상 선택해주세요!"),
});

type FormData = z.infer<typeof schema>;

const GetBody = ({ scrollRef }: RefType) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { selected: "" },
  });

  const { threadsData, setFullContent, setSelectedFirstSentence } =
    useThreads();

  const postFullContents = usePostFullContents({
    onSuccess(res) {
      console.log("Success", res);
      setFullContent(res.data.full_contents);
    },
    onError(e) {
      console.error("Failed", e);
    },
  });

  const onSubmit = (data: FormData) => {
    setFullContent("");
    console.log("선택된 항목:", data.selected);
    setSelectedFirstSentence(data.selected);
    postFullContents.mutate({
      reference: threadsData.reference,
      first_sentence: data.selected,
    });
  };

  // 버튼 클릭시 스크롤 아래로 이동
  const scrollToBottom = useScrollBottom(scrollRef);
  useEffect(() => {
    if (postFullContents.isPending) {
      scrollToBottom();
    }
  }, [postFullContents]);

  // 기존에 선택한 firstSentence가 있을 경우

  useEffect(() => {
    if (threadsData.selectedFirstSentence) {
      setValue("selected", threadsData.selectedFirstSentence);
    }
  }, [threadsData.selectedFirstSentence, setValue]);

  return (
    <Wrapper $isVisible={threadsData.step >= 2}>
      <Flex vertical gap={30}>
        <Title level={5}>
          10개의 후보들 중에서 마음에 드는 첫 문장을 선택해주세요! 선택해주신 첫
          문장을 바탕으로 스레드 내용을 만들어 드릴게요.
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="selected"
            control={control}
            render={({ field }) => (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {threadsData.first_sentence_candidates.map((firstSentence) => (
                  <Button
                    key={firstSentence}
                    onClick={() => field.onChange(firstSentence)}
                    style={{
                      padding: 10,
                      border:
                        field.value === firstSentence
                          ? "2px solid blue"
                          : "1px solid gray",
                      background:
                        field.value === firstSentence ? "#e0f0ff" : "#fff",
                    }}
                  >
                    {firstSentence}
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
        {postFullContents.isPending && <Spin />}
        {!postFullContents.isPending && threadsData.fullContent.length > 1 && (
          <FinalResult
            initialResult={threadsData.fullContent}
            scrollToBottom={scrollToBottom}
          />
        )}
      </Flex>
    </Wrapper>
  );
};

export default GetBody;

const Wrapper = styled.div<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
`;

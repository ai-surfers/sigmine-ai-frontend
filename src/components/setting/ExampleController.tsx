import React from "react";
import { ControllerProps } from "./Setting";
import {
  Button,
  Icon,
  Text,
  Textarea,
  Tooltip,
} from "ai-surfers-design-system";
import { Flex } from "antd";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components";
import { useDeviceSize } from "@/providers/DeviceContext";

const ExampleController = ({ control, errors }: ControllerProps) => {
  const { fields, append, remove } = useFieldArray({
    name: "examples",
    control,
  });
  const { isUnderTablet } = useDeviceSize();
  return (
    <Flex
      vertical
      style={{
        width: "100%",
        overflowY: "scroll",
        paddingRight: "20px",
        boxSizing: "border-box",
      }}
    >
      <Flex align="center" gap={8}>
        <Text font="b1_18_semi" color="G_700" style={{ marginRight: "8px" }}>
          학습할 스레드 추가하기
        </Text>
        <Text font="c1_12_reg" color="G_400">
          선택
        </Text>
        <Text font="c1_12_reg" color="G_400">
          최대 10개
        </Text>
      </Flex>

      <div style={{ width: "100%", marginBottom: "20px" }}>
        <Tooltip
          content={
            <Text
              font="b3_14_med"
              color="white"
              style={{ whiteSpace: "nowrap" }}
            >
              {isUnderTablet ? (
                <TooltipList>
                  <TooltipItem>
                    좋아요 500개 이상,
                    <br /> 유사한 주제의 스레드를 권장해요
                  </TooltipItem>
                  <TooltipItem>
                    본인 말투가 담긴 글은 <br />
                    보다 자연스러운 글 생성에 도움이 돼요
                  </TooltipItem>
                </TooltipList>
              ) : (
                <TooltipList>
                  <TooltipItem>
                    좋아요 500개 이상, 유사한 주제의 스레드를 권장해요
                  </TooltipItem>
                  <TooltipItem>
                    본인 말투가 담긴 글은 보다 자연스러운 글 생성에 도움이 돼요
                  </TooltipItem>
                </TooltipList>
              )}
            </Text>
          }
          position={isUnderTablet ? "bottom" : "right"}
        >
          <NotiWrapper>
            <Icon
              name="MessageQuestion"
              size={16}
              color="G_700"
              variant="Bold"
            />
            <Text font="c1_12_reg" color="G_700">
              어떤 스레드 게시글을 가져오는 것이 좋나요?
            </Text>
          </NotiWrapper>
        </Tooltip>
      </div>
      {/* <Tooltip
        title={
          <Text font="b3_14_med" color="white">
            좋아요 500개 이상, 유사한 주제의 스레드를 권장해요
            <br />
            본인 말투가 담긴 글은 보다 자연스러운 글 생성에 도움이 돼요
          </Text>
        }
        color="G_600"
        placement="right"
      >
        <NotiWrapper>
          <Icon name="MessageQuestion" size={16} color="G_700" variant="Bold" />
          <Text font="c1_12_reg" color="G_700">
            어떤 스레드 게시글을 가져오는 것이 좋나요?
          </Text>
        </NotiWrapper>
      </Tooltip> */}

      <Flex vertical gap={24} style={{ marginBottom: "8px" }}>
        {fields.map((field, index) => (
          <Controller
            key={field.id}
            name={`examples.${index}.content`}
            control={control}
            render={({ field }) => (
              <Flex gap={10} style={{ width: "100%" }} align="center">
                <Flex vertical gap={6} style={{ width: "100%" }}>
                  <Text font="b2_16_semi" color="G_700">
                    예시{index + 1}
                  </Text>
                  <Flex gap={12} align="center" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <Textarea
                        {...field}
                        placeholder="입력 값을 입력해주세요."
                        hierarchy="sigmine"
                        // error={

                        //   !!errors.examples?.[index]?.content
                        // }
                      />
                      {/* {errors.examples?.[index]?.content && (
                        <p style={{ color: "red" }}>
                          {errors.examples[index].content?.message}
                        </p>
                      )} */}
                    </div>
                    <Button
                      onClick={() => remove(index)}
                      hierarchy="gray"
                      width="32px"
                      size={32}
                      style={{
                        padding: "7.5px",
                      }}
                    >
                      <Icon
                        name="SimpleX"
                        color="G_600"
                        variant="Linear"
                        size={16}
                      />
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            )}
          />
        ))}
      </Flex>
      <Button
        hierarchy="normal"
        onClick={() => append({ content: "" })}
        size={44}
        style={{
          width: "calc(100% - 44px)",
          justifyContent: "center",
          marginTop: "24px",
          marginBottom: "68px",
        }}
      >
        추가하기 +
      </Button>
    </Flex>
  );
};

export default ExampleController;

const NotiWrapper = styled.div`
  display: inline-flex;
  background-color: ${({ theme }) => theme.colors.G_200};
  padding: 4px 12px 4px 8px;
  gap: 8px;
  width: 255px;
  box-sizing: border-box;
  border-radius: 4px;
  margin-top: 4px;
`;

const TooltipList = styled.ul`
  list-style-type: disc;
  margin-left: 20px;
`;

const TooltipItem = styled.li`
  color: ${({ theme }) => theme.colors.white}; // 필요 시
`;

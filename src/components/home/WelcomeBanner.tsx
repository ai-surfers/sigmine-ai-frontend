import React from "react";
import { Button, Icon, Text } from "ai-surfers-design-system";
import { Flex } from "antd";
import Image from "next/image";
import styled from "styled-components";

const WelcomeBanner = () => {
  return (
    <Flex vertical>
      <Image
        src="/imgs/home-welcome.png"
        width={1308}
        height={233}
        style={{ width: "100%", height: "auto" }}
        alt="welcome"
        priority
      />
      <ButtonWrapper>
        <Button hierarchy="sigmineSecondary" size={66}>
          <Flex
            gap={41}
            justify="start"
            align="center"
            style={{ paddingRight: "72px" }}
          >
            <PlusBox>
              <Icon name="Add" color="sigmine_primary" variant="Linear" />
            </PlusBox>
            <Text
              font="b2_16_semi"
              color="sigmine_primary"
              style={{ width: "178px", letterSpacing: "-0.02rem" }}
            >
              SIGMINE 프로젝트 시작하기
            </Text>
          </Flex>
        </Button>
      </ButtonWrapper>
    </Flex>
  );
};

export default WelcomeBanner;

const ButtonWrapper = styled.div`
  margin-top: -30px;
  display: flex;
  justify-content: center;
`;

const PlusBox = styled.div`
  display: flex;
  width: 36px;
  height: 36px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.sigmine_primary_10};
  background-color: ${({ theme }) => theme.colors.sigmine_primary_5};
`;

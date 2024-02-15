import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface MonthlyUsageEmailProps {
  firstName: string;
  title: string;
  period: string;
  percentPlan: number;
}

export const MonthlyUsageEmail = ({
  firstName,
  period,
  title,
  percentPlan,
}: MonthlyUsageEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>{`Your Defer usage for ${period}`}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={"https://www.defer.run/github/defer_lightmode.png"}
                width="250"
                height="131"
                alt="Defer"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              {title}
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {firstName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              You used {percentPlan}% of your <strong>Pro plan</strong> capacity
              last month. <br /> You will find the detailed list of executions
              attached.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                // pX={20}
                // pY={12}
                className="px-5 py-3 bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
                href={"#"}
              >
                Go to the Console
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default MonthlyUsageEmail;

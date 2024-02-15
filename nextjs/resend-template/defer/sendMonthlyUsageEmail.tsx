import React from "react";
import { Resend } from "resend";
import { defer } from "@defer/client";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import MonthlyUsageEmail from "@/emails/MonthlyUsage";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// PDF file listing the executions with associated usage
const ExecutionsDetail = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

const resend = new Resend(process.env.RESEND_API_KEY || "");

async function sendMonthlyUsage(_userId: string) {
  const pdf = await renderToBuffer(<ExecutionsDetail />);

  const title = `You performed ${new Intl.NumberFormat().format(
    123000
  )} executions in September 2023`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "<your_test_email@example.com>",
    subject: title,
    html: title,
    react: MonthlyUsageEmail({
      firstName: "Charly",
      title,
      percentPlan: 13,
      period: "September, 2023",
    }),
    attachments: [
      {
        content: pdf,
        filename: "detail.pdf",
      },
    ],
  });
}

export default defer(sendMonthlyUsage, {
  // setup concurrency to match Resend's rate limiting:
  //  https://resend.com/docs/api-reference/introduction#rate-limit
  concurrency: 8,
  // enable retries in case of network or reliability issues
  retry: 5,
});

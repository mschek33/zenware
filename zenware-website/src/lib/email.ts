import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import type { DreamScores, DreamPillar } from '@/types/assessment';
import { getScoreRating, generateRecommendations } from './scoring';

// Initialize SES client
const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-west-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@zenware.org';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send an email using AWS SES
 */
export async function sendEmail({ to, subject, html, text }: SendEmailParams): Promise<boolean> {
  try {
    const command = new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: html,
          },
          ...(text && {
            Text: {
              Charset: 'UTF-8',
              Data: text,
            },
          }),
        },
      },
    });

    await sesClient.send(command);
    console.log(`Email sent successfully to ${to}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

/**
 * Generate and send assessment results email
 */
export async function sendAssessmentResultsEmail(
  to: string,
  name: string | null,
  assessmentId: string,
  tier: string,
  scores: DreamScores
): Promise<boolean> {
  const recommendations = generateRecommendations(scores);
  const pillars: DreamPillar[] = ['demand', 'revenue', 'engine', 'admin', 'marketing'];

  const pillarNames: Record<DreamPillar, string> = {
    demand: 'Demand',
    revenue: 'Revenue',
    engine: 'Engine',
    admin: 'Admin',
    marketing: 'Marketing',
  };

  const resultsUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://zenware.org'}/assessment/results/${assessmentId}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your DREAM AI Audit Results</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); padding: 40px 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">
                Your DREAM AI Audit Results
              </h1>
              <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                ${tier.charAt(0).toUpperCase() + tier.slice(1)} Assessment Complete
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 40px 40px 20px;">
              <p style="margin: 0; color: #3f3f46; font-size: 16px; line-height: 1.6;">
                ${name ? `Hi ${name},` : 'Hello,'}
              </p>
              <p style="margin: 16px 0 0; color: #52525b; font-size: 16px; line-height: 1.6;">
                Thank you for completing the Zenware DREAM Framework AI Audit. Here's a summary of your results:
              </p>
            </td>
          </tr>

          <!-- Overall Score -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #faf5ff 0%, #fdf2f8 100%); border-radius: 12px; padding: 24px; text-align: center;">
                <tr>
                  <td>
                    <p style="margin: 0; color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                      Overall Score
                    </p>
                    <p style="margin: 8px 0 4px; color: #18181b; font-size: 48px; font-weight: 700;">
                      ${scores.overall.toFixed(1)}<span style="font-size: 24px; color: #a1a1aa;">/10</span>
                    </p>
                    <p style="margin: 0; color: #7c3aed; font-size: 16px; font-weight: 500;">
                      ${getScoreRating(scores.overall)}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pillar Scores -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="margin: 0 0 16px; color: #18181b; font-size: 18px; font-weight: 600;">
                DREAM Pillar Breakdown
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${pillars
                  .map(
                    (pillar) => `
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="color: #3f3f46; font-size: 14px; font-weight: 500;">
                            ${pillarNames[pillar]}
                          </td>
                          <td style="text-align: right;">
                            <span style="color: #7c3aed; font-size: 16px; font-weight: 600;">${scores[pillar].toFixed(1)}</span>
                            <span style="color: #a1a1aa; font-size: 14px;">/10</span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                `
                  )
                  .join('')}
              </table>
            </td>
          </tr>

          <!-- Top Recommendations -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="margin: 0 0 16px; color: #18181b; font-size: 18px; font-weight: 600;">
                Key Recommendations
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafafa; border-radius: 8px; padding: 16px;">
                <tr>
                  <td>
                    ${pillars
                      .slice(0, 3)
                      .map(
                        (pillar) => `
                      <p style="margin: 0 0 12px; color: #52525b; font-size: 14px; line-height: 1.5;">
                        <strong style="color: #18181b;">${pillarNames[pillar]}:</strong> ${recommendations[pillar][0]}
                      </p>
                    `
                      )
                      .join('')}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 40px 40px; text-align: center;">
              <a href="${resultsUrl}" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 30px; font-size: 16px; font-weight: 500;">
                View Full Results
              </a>
              <p style="margin: 16px 0 0; color: #a1a1aa; font-size: 12px;">
                Or copy this link: ${resultsUrl}
              </p>
            </td>
          </tr>

          <!-- Consultation CTA -->
          <tr>
            <td style="background-color: #18181b; padding: 30px 40px; text-align: center;">
              <h3 style="margin: 0 0 8px; color: #ffffff; font-size: 18px; font-weight: 600;">
                Ready to Transform Your Business?
              </h3>
              <p style="margin: 0 0 16px; color: #a1a1aa; font-size: 14px;">
                Schedule a free consultation to discuss your AI automation roadmap.
              </p>
              <a href="https://zenware.org/contact" style="display: inline-block; background-color: #ffffff; color: #18181b; text-decoration: none; padding: 12px 24px; border-radius: 20px; font-size: 14px; font-weight: 500;">
                Book Consultation
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; text-align: center; border-top: 1px solid #e4e4e7;">
              <p style="margin: 0; color: #a1a1aa; font-size: 12px;">
                &copy; ${new Date().getFullYear()} Zenware. Conscious Technology for Business Transformation.
              </p>
              <p style="margin: 8px 0 0; color: #a1a1aa; font-size: 12px;">
                <a href="https://zenware.org" style="color: #7c3aed; text-decoration: none;">zenware.org</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const text = `
Your DREAM AI Audit Results

${name ? `Hi ${name},` : 'Hello,'}

Thank you for completing the Zenware DREAM Framework AI Audit. Here's a summary of your results:

OVERALL SCORE: ${scores.overall.toFixed(1)}/10 - ${getScoreRating(scores.overall)}

PILLAR BREAKDOWN:
- Demand: ${scores.demand.toFixed(1)}/10
- Revenue: ${scores.revenue.toFixed(1)}/10
- Engine: ${scores.engine.toFixed(1)}/10
- Admin: ${scores.admin.toFixed(1)}/10
- Marketing: ${scores.marketing.toFixed(1)}/10

KEY RECOMMENDATIONS:
${pillars
  .slice(0, 3)
  .map((pillar) => `- ${pillarNames[pillar]}: ${recommendations[pillar][0]}`)
  .join('\n')}

View your full results: ${resultsUrl}

Ready to transform your business? Schedule a free consultation at https://zenware.org/contact

---
Zenware - Conscious Technology for Business Transformation
https://zenware.org
  `;

  return sendEmail({
    to,
    subject: `Your DREAM AI Audit Results - Score: ${scores.overall.toFixed(1)}/10`,
    html,
    text,
  });
}

export async function sendReservationConfirmationEmail(input: {
  to: string;
  reservationId: string;
  totalPrice: number;
}) {
  if (!process.env.RESEND_API_KEY) {
    return;
  }

  // Placeholder for provider integration (Resend/SendGrid).
  console.info("Email queued", input);
}

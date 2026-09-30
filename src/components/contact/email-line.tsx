/** Small fallback line under the booking hub for anyone who'd rather not book. */
export function EmailLine({ email }: { email: string }) {
  return (
    <p className="mt-10 text-center text-[15px] text-muted">
      Prefer email?{" "}
      <a
        href={`mailto:${email}`}
        className="font-semibold text-ink underline decoration-line underline-offset-4 -mx-[0.2em] rounded-[0.35em] px-[0.2em] box-decoration-clone transition-colors duration-200 hover:bg-lime"
      >
        {email}
      </a>{" "}
      Nazar and Oleh read every message.
    </p>
  );
}

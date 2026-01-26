"use client";

import { useState } from "react";
import WhatsAppFloating from "../ui/whatsAppFloating";
import CookieConsent from "../ui/cookieConsent";

export default function GlobalUI() {
  const [cookieVisible, setCookieVisible] = useState(false);

  return (
    <>
      <WhatsAppFloating offsetBottom={cookieVisible ? 110 : 20} />
      <CookieConsent onVisibleChange={setCookieVisible} />
    </>
  );
}

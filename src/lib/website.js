export function getCompanyName(website) {
  return website?.company?.websiteName || website?.company?.name || "";
}

export function getLogo(website) {
  return website?.company?.logo || "/logo.png";
}

export function getPhone(website) {
  return website?.company?.phone || "";
}

export function getEmail(website) {
  return website?.company?.email || "";
}

export function getWhatsapp(website) {
  return website?.settings?.whatsapp || website?.company?.phone || "";
}

export function getAddress(website) {
  return website?.settings?.ecommerceLocal?.address || "";
}

export function getSchedule(website) {
  return website?.settings?.schedule || "8:00 AM - 6:00 PM";
}

export function getFacebook(website) {
  return website?.settings?.facebook || "";
}

export function getInstagram(website) {
  return website?.settings?.instagram || "";
}

export function getTikTok(website) {
  return website?.settings?.tiktok || "";
}

export function getYoutube(website) {
  return website?.settings?.youtube || "";
}

export function getFooterText(website) {
  return (
    website?.settings?.footerText ||
    "Cumplimos con la Ley 1480 de 2011 y la Ley 1581 de 2012."
  );
}

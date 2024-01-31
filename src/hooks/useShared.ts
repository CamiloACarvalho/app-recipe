import { useState } from 'react';

export const useShared = (): any => {
  const [copyLink, setCopyLink] = useState<string>('');

  const handleShared = async (id: number = 0, isDrink: boolean = false) => {
    let url;
    url = window.location.href;
    url = url.replace(/\/in-progres$/, '');
    if (id > 0) {
      if (isDrink) {
        url = `${window.location.origin}/drinks/${id}`;
      } else {
        url = `${window.location.origin}/meals/${id}`;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopyLink('Link copied!');
      setTimeout(() => setCopyLink(''), 3000);
    } catch (err) {
      setCopyLink('Failed to copy link');
    }
  };
  return { handleShared, copyLink };
};

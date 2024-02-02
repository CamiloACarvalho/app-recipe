import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useShared = (): any => {
  const [copyLink, setCopyLink] = useState<string>('');

  const location = useLocation();

  const handleShared = async (id: number = 0, isDrink: boolean = false) => {
    let url;

    url = location.pathname;
    url = url.replace(/\/in-progres$/, '');
    if (id > 0) {
      if (isDrink) {
        url = `${location.pathname}/drinks/${id}`;
      } else {
        url = `${location.pathname}/meals/${id}`;
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

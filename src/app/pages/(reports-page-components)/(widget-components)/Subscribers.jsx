'use client';

import {useEffect, useState} from 'react';
import Spinner from '@/app/components/Spinner';
import formatNumber from '@/app/utility/formatNumber';
import InfoWidget from '@/app/components/InfoWidget';

export default function Subscribers() {
  const [data, setData] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataPromise = new Promise((resolve) => {
      setTimeout(() => {
        const data = 1546289;
        resolve(data);
      }, 300);
    });

    dataPromise
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="col-span-1">
      {
        loading ? (
          <Spinner border={{
            rounded: 'md'
          }}/>
        ) : (
          <InfoWidget
            title="Subscribers"
            value={new Intl.NumberFormat().format(data)}
            info={{type: 'positive', text: '+8% from year'}}
          />
        )
      }
    </div>
  );
}

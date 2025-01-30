'use client';

import {useEffect, useState} from 'react';
import Spinner from '@/app/components/Spinner';
import formatCurrency from '@/app/utility/formatCurrency';
import InfoWidget from '@/app/components/InfoWidget';

export default function Revenue() {
  const [data, setData] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataPromise = new Promise((resolve) => {
      setTimeout(() => {
        const data = 7350000;
        resolve(data);
      }, 350);
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
            title="Revenue"
            value={formatCurrency(data)}
            info={{type: 'negative', text: '-5% from year'}}
          />
        )
      }
    </div>
  );
}

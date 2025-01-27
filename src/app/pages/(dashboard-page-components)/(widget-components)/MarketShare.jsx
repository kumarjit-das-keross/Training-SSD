'use client';

import {useEffect, useState} from 'react';
import Widget from '@/app/components/Widget';
import Spinner from '@/app/components/Spinner';
import formatCurrency from '@/app/utility/formatCurrency';

export default function MarketShare() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataPromise = new Promise((resolve) => {
      setTimeout(() => {
        const data = 2340000;
        resolve(data);
      }, 400);
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
          <Widget title="Market Share">
            {formatCurrency(data)}
          </Widget>
        )
      }
    </div>
  );
}

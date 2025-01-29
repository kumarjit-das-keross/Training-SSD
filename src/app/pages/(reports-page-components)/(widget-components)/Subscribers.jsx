'use client';

import {useEffect, useState} from 'react';
import Widget from '@/app/components/Widget';
import Spinner from '@/app/components/Spinner';
import formatNumber from '@/app/utility/formatNumber';

export default function Subscribers() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataPromise = new Promise((resolve) => {
      setTimeout(() => {
        const data = 154628;
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
          <Widget title="Subscribers">
            {formatNumber('154678')}
          </Widget>
        )
      }
    </div>
  );
}

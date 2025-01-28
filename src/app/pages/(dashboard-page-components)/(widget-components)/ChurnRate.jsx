'use client';

import {useEffect, useState} from 'react';
import Widget from '@/app/components/Widget';
import Spinner from '@/app/components/Spinner';

export default function ChurnRate() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataPromise = new Promise((resolve) => {
      setTimeout(() => {
        const data = 0.0467;
        resolve(data);
      }, 450);
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
          <Widget title="Churn Rate">
            {(data * 100).toFixed(2) + '%'}
          </Widget>
        )
      }
    </div>
  );
}

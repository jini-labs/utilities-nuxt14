'use client'
import React, { useState, useEffect } from 'react';
import shortid from 'shortid';

const Shortid = () => {
  const MAX_GEN_COUNT = 20;
  const [sampleId, setSampleId] = useState<string>('');
  const [generateCount, setGenerateCount] = useState<number>(1);
  const [generatedIds, setGeneratedIds] = useState<string[]>([]);

  useEffect(() => {
    setSampleId(shortid.generate());
  }, [])

  const handleGenerateCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(MAX_GEN_COUNT, Number(e.target.value)));
    setGenerateCount(() => value);
  }
  const handleGenerateId = () => {
    const newIds: string[] = [];
    if (!generateCount || generateCount <= 0) {
      newIds.push(shortid.generate())
    } else {
      for (let i = 0; i < generateCount; i++) {
        newIds.push(shortid.generate());
      }
    }
    setGeneratedIds(() => newIds);
  }
  const handleCopyToClipboard = (ids: string[]) => {
    if (ids.length) {
      navigator.clipboard.writeText(ids.join(' '));
    }
  }
  return (
    <div className='uuid__inner'>
      <div className='uuid__title'>
        <h2> ShortID </h2>
      </div>
      <div className='uuid__description'>
      ランダムな文字列や数字で生成されるユニークなIDです。オブジェクトを作成する際にアサインされることがあり、オブジェクト名のハッシュから生成されます。
      </div>
      <div className='uuid__sample'>
        <h3 className='uuid__sample_title'>サンプル</h3>
        <h3 className='uuid__sample_id'>
          {sampleId}
          <span className='uuid__id_copy' onClick={() => handleCopyToClipboard([sampleId])}>コピー</span>
        </h3>
      </div>
      <div className='uuid__create'>
        <label>
          <input
            className='uuid_create_input_count'
            type='number' 
            onChange={handleGenerateCount}
            value={generateCount}
            placeholder='Max 20'
            min='1'
            max='20'
          /> 件
        </label>
        <button onClick={handleGenerateId}>生成</button>
      </div>
      <div className='uuid__created_ids'>
        <p>
          {generatedIds.length > 0 &&
            <div>
              {generatedIds.map((item) => (
                <div className='uuid__created_id' key={item}> {item} </div>
              ))}
            </div>
          }
        </p>
      </div>
    </div>
  )
}

export default Shortid
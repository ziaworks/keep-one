import React, { useState, useEffect } from 'react';
import { useZxing } from 'react-zxing';
import { supabase } from '../supabaseClient';
import { getCurrentUser } from '../utils/auth';
import './UpcScanner.css';

const UpcScanner: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [scanStatus, setScanStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [scanMessage, setScanMessage] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUserId(user.id);
      }
    };

    getUser();
  }, []);

  const { ref } = useZxing({
    onDecodeResult(result) {
      const upcCode = result.getText();
      setResult(upcCode);
      saveToSupabase(upcCode);
    },
    onError(error) {
      console.error('Scanner error:', error);
    },
  });

  const saveToSupabase = async (upcCode: string) => {
    if (!userId) {
      setScanStatus('error');
      setScanMessage('User not authenticated');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('upc_scans')
        .insert([
          { 
            user_id: userId,
            upc_code: upcCode, 
            scanned_at: new Date().toISOString() 
          }
        ]);
      
      if (error) {
        setScanStatus('error');
        setScanMessage('Failed to save scan: ' + error.message);
        console.error('Error saving to Supabase:', error);
      } else {
        setScanStatus('success');
        setScanMessage('UPC code saved successfully!');
        console.log('Saved to Supabase:', data);

        // Reset status after 3 seconds
        setTimeout(() => {
          setScanStatus('idle');
          setScanMessage('');
        }, 3000);
      }
    } catch (error) {
      setScanStatus('error');
      setScanMessage('Unexpected error occurred');
      console.error('Unexpected error:', error);
    }
  };

  const resetScan = () => {
    setResult('');
    setScanStatus('idle');
    setScanMessage('');
  };

  return (
    <div className="scanner-container">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="left-side">9:41</div>
        <div className="notch"></div>
        <div className="right-side">
          <div className="battery"></div>
          <div className="wifi"></div>
          <div className="mobile-signal"></div>
        </div>
      </div>

      <div className="scanner-header">
        <h1>UPC Scanner</h1>
        <p>Scan a UPC barcode to save it to your database</p>
      </div>

      <div className="scanner-view">
        {!result ? (
          <video ref={ref} className="scanner-video" />
        ) : (
          <div className="scan-result">
            <h2>Scanned Code:</h2>
            <p className="upc-code">{result}</p>
            <div className={`scan-status ${scanStatus}`}>
              {scanMessage}
            </div>
            <button className="scan-again-button" onClick={resetScan}>
              Scan Another Code
            </button>
          </div>
        )}
      </div>

      {/* Scanner guide overlay */}
      {!result && (
        <div className="scanner-guide">
          <div className="scanner-target"></div>
          <p>Position barcode within the frame</p>
        </div>
      )}

      {/* Home Indicator */}
      <div className="home-indicator">
        <div className="indicator"></div>
      </div>
    </div>
  );
};

export default UpcScanner; 
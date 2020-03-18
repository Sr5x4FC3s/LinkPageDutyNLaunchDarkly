import React, {useState, useEffect} from 'react';
import { user1 } from '../../../../lib/userInfo';
import LDClient from 'launchdarkly-js-client-sdk';

const ConfigureBootstrapComponent = ({ userOptions }) => {
  const [hash, setHash] = useState(false);
  const [bootstrap, setBootstrap] = useState(false);
  const [report, setReport] = useState(false);
  const [evalReasons, setEvalReasons] = useState(false);
  const [isPrivate, setPrivate] = useState(false);
  const [userAttribute, setUserAttribute] = useState(userOptions);
  const [flushInterval, setFlushInterval] = useState(0); // if 0, default is 2000 ms
  const [sendEvents, setSendEvents] = useState(true);
  const [fetchGoals, setFetchGoals] = useState(true);
  const [sendLDHeader, setSendLDHeader] = useState(true);
  const [allowFrequentDupEvents, setAllowFrequentDupEvents] = useState(false);
  const [sendEventsOnlyForVariation, setSendEventsOnlyForVariation] = useState(false);
  const [streamReconnectDelay, setStreamReconnectDelay] = useState(0); // if 0, default is 1000 ms

  const incrementInMS = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

  useEffect(() => {
    console.log('user Options: ', userOptions);
    setUserAttribute(userOptions);
  }, [userOptions]);

  const styles = {
    redBox: {width: '100px', height: '50px', backgroundColor: 'red'},
    greenBox: {width: '100px', height: '50px', backgroundColor: 'green'},
  };

  return (
    <div>
      <h2>Configure Connection Options</h2>
      {/*Hash*/}
      <div>Hash (On/Off)</div>
      {!hash ? 
        <div style={styles.redBox}>Hash Indicator: {hash}</div>
        : 
        <div style={styles.greenBox}>Hash Indicator: {hash}</div>
      }
      <button onClick={() => setHash(!hash)}>Hash</button>

      {/*Bootstrap*/}
      <div>Bootstrap (On/Off)</div>
      {!bootstrap ? 
        <div style={styles.redBox}>Bootstrap Indicator: {bootstrap}</div>
        : 
        <div style={styles.greenBox}>Bootstrap Indicator: {bootstrap}</div>
      }
      <button onClick={() => setBootstrap(!bootstrap)}>Bootstrap</button>

      {/*Report*/}
      <div>Report (On/Off)</div>
      {!report ? 
        <div style={styles.redBox}>Report Indicator: {report}</div>
        : 
        <div style={styles.greenBox}>Report Indicator: {report}</div>
      }
      <button onClick={() => setReport(!report)}>Report</button>

      {/*Evaluation Reasons*/}
      <div>Evaluation Reasons (On/Off)</div>
      {!evalReasons ? 
        <div style={styles.redBox}>Evaluation Reasons Indicator: {evalReasons}</div>
        : 
        <div style={styles.greenBox}>Evaluation Reasons Indicator: {evalReasons}</div>
      }
      <button onClick={() => setEvalReasons(!evalReasons)}>Evaluation Reasons</button>

      {/*Toggle Private*/}
      <div>Private (On/Off)</div>
      {!isPrivate ? 
        <div style={styles.redBox}>Private Indicator: {isPrivate}</div>
        : 
        <div style={styles.greenBox}>Private Indicator: {isPrivate}</div>
      }
      <button onClick={() => setPrivate(!isPrivate)}>Private</button>

      {/*Send Events*/}
      <div>Send Events (On/Off)</div>
      {!sendEvents ? 
        <div style={styles.redBox}>Send Events Indicator: {sendEvents}</div>
        : 
        <div style={styles.greenBox}>Send Events Indicator: {sendEvents}</div>
      }
      <button onClick={() => setSendEvents(!sendEvents)}>Send Events</button>

      {/*Fetch Goals*/}
      <div>Fetch Goals (On/Off)</div>
      {!fetchGoals ? 
        <div style={styles.redBox}>Fetch Goals Indicator: {fetchGoals}</div>
        : 
        <div style={styles.greenBox}>Fetch Goals Indicator: {fetchGoals}</div>
      }
      <button onClick={() => setFetchGoals(!fetchGoals)}>Fetch Goals</button>

      {/* Send LD Header*/}
      <div>Send LD Header (On/Off)</div>
      {!sendLDHeader ? 
        <div style={styles.redBox}>Send LD Header Indicator: {sendLDHeader}</div>
        : 
        <div style={styles.greenBox}>Send LD Header Indicator: {sendLDHeader}</div>
      }
      <button onClick={() => setSendLDHeader(!sendLDHeader)}>Send LD Header</button>

      {/*Allow Frequent Duplicate Events*/}
      <div>Allow Frequent Duplicate Events (On/Off)</div>
      {!allowFrequentDupEvents ? 
        <div style={styles.redBox}>Allow Frequent Duplicate Events Indicator: {allowFrequentDupEvents}</div>
        : 
        <div style={styles.greenBox}>Allow Frequent Duplicate Events Indicator: {allowFrequentDupEvents}</div>
      }
      <button onClick={() => setAllowFrequentDupEvents(!allowFrequentDupEvents)}>Allow Frequent Duplicate Events</button>

      {/*Send Events Only For Variation*/}
      <div>Send Events Only For Variation (On/Off)</div>
      {!sendEventsOnlyForVariation ? 
        <div style={styles.redBox}>Send Events Only For Variation Indicator: {sendEventsOnlyForVariation}</div>
        : 
        <div style={styles.greenBox}>Send Events Only For Variation Indicator: {sendEventsOnlyForVariation}</div>
      }
      <button onClick={() => setSendEventsOnlyForVariation(!sendEventsOnlyForVariation)}>Send Events Only For Variation</button>
      <form>
        <label>
          Flush Interval
          <select>
            {incrementInMS.map(increment => (
              <option value={increment} onChange={e => setFlushInterval(e.target.value)}>{increment}</option>
            ))}
          </select>
        </label>
        <label>
          Stream Reconnect Delay
          <select onChange={e => {setStreamReconnectDelay(e.target.value)}}>
            {incrementInMS.map(increment => (
              <option value={increment}>{increment}</option>
            ))}
          </select>
        </label>
        <input 
          type='submit'
          value='submit'
        />
      </form>
    </div>
  );
};

export default ConfigureBootstrapComponent;
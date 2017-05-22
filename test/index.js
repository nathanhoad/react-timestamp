import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Moment from 'moment-timezone';
import Should from 'should';
import JSDOM from 'jsdom';

import Timestamp from '../lib/timestamp';


global.document = JSDOM.jsdom("<!doctype html><html><body></body></html>");
global.window = document.defaultView;


describe('Timestamp', () => {
    
    it('renders a normal time ago', (done) => {
        let timestamp = TestUtils.renderIntoDocument(
            <Timestamp time={Moment().subtract(3, 'days')} />
        );
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal("3 days ago");
        
        timestamp = TestUtils.renderIntoDocument(
            <Timestamp time={Moment().subtract(3, 'months')} />
        );
        
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal("3 months ago");
        
        timestamp = TestUtils.renderIntoDocument(
            <Timestamp time={Moment().subtract(3, 'months')} since={Moment().subtract(1, 'month')} />
        );
        
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal("2 months");
        
        timestamp = TestUtils.renderIntoDocument(
            <Timestamp time={Moment().subtract(3, 'months')} until={Moment().add(1, 'month')} />
        );
        
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal("4 months");
        
        timestamp = TestUtils.renderIntoDocument(
            <Timestamp time={Moment().subtract(1, 'year').subtract(2, 'months').subtract(3, 'days')} precision={3} />
        );
        
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal("1 year, 2 months, 3 days ago");
        
        done();
    });
    
    
    it('renders a normal time in the future', (done) => {
        let timestamp = TestUtils.renderIntoDocument(
            <Timestamp time={Moment().add(4, 'days')} />
        );
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal("in 4 days");
        
        timestamp = TestUtils.renderIntoDocument(
            <Timestamp time={Moment().add(4, 'months')} />
        );
        
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal("in 4 months");
        
        done();
    });
    
    
    describe('renders a normal time in local time', () => {
        it('in full', (done) => {
            let local = Moment();
            let utc = Moment().utc();
            
            let timestamp = TestUtils.renderIntoDocument(
                <Timestamp time={utc} format="full" />
            );
            
            Should(ReactDOM.findDOMNode(timestamp).textContent).equal(local.format('D MMM YYYY, h:mma'));
            
            timestamp = TestUtils.renderIntoDocument(
                <Timestamp time={utc.format('YYYY-MM-DD h:mm:ss')} format="full" />
            );
            
            Should(ReactDOM.findDOMNode(timestamp).textContent).equal(local.format('D MMM YYYY, h:mma'));
            
            // Check for includeDay
            local = Moment();
            utc = Moment().utc();
            
            timestamp = TestUtils.renderIntoDocument(
                <Timestamp time={utc} format="full" includeDay />
            );
            
            Should(ReactDOM.findDOMNode(timestamp).textContent).equal(local.format('dddd, D MMM YYYY, h:mma'));
            
            done();
        });
        
        
        it('just the date', (done) => {
            let local = Moment();
            let utc = Moment().utc();
            
            let timestamp = TestUtils.renderIntoDocument(
                <Timestamp time={utc} format="date" />
            );
            
            Should(ReactDOM.findDOMNode(timestamp).textContent).equal(local.format('D MMM YYYY'));
            
            done();
        });
        
        
        it('just the time', (done) => {
            let local = Moment();
            let utc = Moment().utc();
            
            let timestamp = TestUtils.renderIntoDocument(
                <Timestamp time={utc} format="time" />
            );
            
            Should(ReactDOM.findDOMNode(timestamp).textContent).equal(local.format('h:mma'));
            
            done();
        });
        
        
        it('includes the day', (done) => {
            let local = Moment();
            let utc = Moment().utc();
            
            let timestamp = TestUtils.renderIntoDocument(
                <Timestamp time={utc} format="date" includeDay />
            );
            
            Should(ReactDOM.findDOMNode(timestamp).textContent).equal(local.format('dddd, D MMM YYYY'));
            
            done();
        });
    });
    
    
    it('renders an integer timestamp in local time', (done) => {
        let local = Moment();
        let utc = Moment().utc();
        
        let timestamp = TestUtils.renderIntoDocument(
            <Timestamp time={utc.unix()} format="full" />
        );
        
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal(local.format('D MMM YYYY, h:mma'));
        
        done();
    });
    
    
    it('renders "never" for a bad date', (done) => {
        let timestamp = TestUtils.renderIntoDocument(
            <Timestamp time="not a date or time" format="full" />
        );
        
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal('never');
        
        timestamp = TestUtils.renderIntoDocument(
            <Timestamp time={NaN} format="full" />
        );
        
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal('never');
        
        timestamp = TestUtils.renderIntoDocument(
            <Timestamp time={null} format="full" />
        );
        
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal('never');
        
        done();
    });
    
    
    it('renders "never" for a null date', (done) => {
        let timestamp = TestUtils.renderIntoDocument(
            <Timestamp time={null} format="full" />
        );
        
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal('never');
        
        done();
    });
    
    
    it('renders without converting from UTC', (done) => {
        let sydney = Moment().tz('Australia/Sydney');
        let timestamp = TestUtils.renderIntoDocument(
            <Timestamp time={sydney.format()} utc={false} format="full" />
        );
        
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal(sydney.format('D MMM YYYY, h:mma'));
        
        let perth = Moment().tz('Australia/Perth');
        timestamp = TestUtils.renderIntoDocument(
            <Timestamp time={perth.format()} utc={false} format="full" />
        );
        
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal(perth.format('D MMM YYYY, h:mma'));
        
        let la = Moment().tz('America/Los_Angeles');
        timestamp = TestUtils.renderIntoDocument(
            <Timestamp time={la.format()} utc={false} format="full" />
        );
        
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal(la.format('D MMM YYYY, h:mma'));
        
        done();
    });
    
});

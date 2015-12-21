import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Moment from 'moment';
import Should from 'should';
import JSDOM from 'jsdom';

import Timestamp from '../src/timestamp';


global.document = JSDOM.jsdom("<!doctype html><html><body></body></html>");
global.window = document.defaultView;


describe('Timestamp', () => {
    
    it('renders a normal time ago', () => {
        let timestamp = TestUtils.renderIntoDocument(
            <Timestamp time={Moment().subtract(3, 'days')} />
        );
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal("3 days ago");
        
        timestamp = TestUtils.renderIntoDocument(
            <Timestamp time={Moment().subtract(3, 'months')} />
        );
        
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal("3 months ago");
    });
    
    
    it('renders a normal time in local time', () => {
        let local = Moment();
        let utc = Moment().utc();
        
        let timestamp = TestUtils.renderIntoDocument(
            <Timestamp time={utc} format="short" />
        );
        
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal(local.format('D MMM YYYY, h:mma'));
    });
    
    
    it('renders an integer timestamp in local time', () => {
        let local = Moment();
        let utc = Moment().utc();
        
        let timestamp = TestUtils.renderIntoDocument(
            <Timestamp time={utc.unix()} format="short" />
        );
        
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal(local.format('D MMM YYYY, h:mma'));
    });
    
    
    it('renders "never" for a bad date', () => {
        let timestamp = TestUtils.renderIntoDocument(
            <Timestamp time="not a date or time" format="short" />
        );
        
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal('never');
    });
    
});
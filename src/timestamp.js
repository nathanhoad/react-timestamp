const React = require('react');


const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


function plural (string, count, many) {
    if (count == 1) {
        return string;
    } else if (many) {
        return many;
    } else {
        return string + "s";
    }
}


class Timestamp extends React.Component {
    _distanceOfTimeInWords (date, compare_to) {
        var is_comparing = false;
        
        if (compare_to) {
            if (compare_to.toDate) compare_to = compare_to.toDate();
            is_comparing = true;
        } else {
            compare_to = new Date();
        }
        
        var seconds = Math.floor((compare_to.getTime() - date.getTime()) / 1000);
        var is_ago = (seconds >= 0);
        
        seconds = Math.abs(seconds);
        
        var distance;
        var when;
        
        if (seconds < 60) { // 1 minute
            if (is_comparing) {
                return is_ago ? "Just then" : "Soon";
            } else {
                return 'A few seconds';
            }
            
        } else if (seconds < 60 * 60) { // 1 hour
            distance = Math.round(seconds / 60);
            when = `${distance} ${plural('minute', distance)}`;
            
        } else if (seconds < 60 * 60 * 24) { // 1 day
            distance = Math.round(seconds / (60 * 60));
            when = `${distance} ${plural('hour', distance)}`;
            
        } else if (seconds < 60 * 60 * 24 * 7) { // 1 week
            distance = Math.round(seconds / (60 * 60 * 24));
            when = `${distance} ${plural('day', distance)}`;
            
        } else if (seconds < 60 * 60 * 24 * (365 / 12)) { // 1 month
            distance = Math.round(seconds / (60 * 60 * 24 * 7));
            when = `${distance} ${plural('week', distance)}`;
            
        } else if (seconds < 60 * 60 * 24 * 30 * 12) { // # 1 year
            distance = Math.round(seconds / (60 * 60 * 24 * (365 / 12)));
            when = `${distance} ${plural('month', distance)}`;
            
        } else {
            return this._prettyTime(date);
        }
        
        if (is_comparing) {
            return when;
        } else if (is_ago) {
            return `${when} ago`;
        } else {
            return `in ${when}`;
        }
    }
    
    
    _prettyTime (date) {
        var hours,
            minutes,
            ampm;
            
        // eg. 5 Nov 12, 1:37pm
        if (date.getHours() % 12 == 0) {
            hours = 12;
        } else {
            hours = date.getHours() % 12;
        }
            
        if (date.getMinutes() < 10) {
            minutes = '0' + date.getMinutes();
        } else {
            minutes = '' + date.getMinutes();
        }
        
        if (date.getHours() > 11) {
            ampm = 'pm';
        } else {
            ampm = 'am';
        }
        
        var day = (this.props.includeDay ? DAYS[date.getDay()] + ', ' : '');
        
        switch (this.props.format) {
            case 'date':
                return `${day}${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
            case 'time':
                return `${hours}:${minutes}${ampm}`;
            case 'full':
            default:
                return `${day}${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}, ${hours}:${minutes}${ampm}`;
        }
    }
    
    
    _parseDate (date) {
        if (date === '' || date === false || date === null) return false;
        
        if (typeof date === "number" || "" + parseInt(date, 10) == date) {
            date = parseInt(date, 10);
            date = new Date(date * 1000);
        }
        
        if (date.toJSON) {
            date = date.toJSON();
        } else {
            date = date.toString();
        }
        
        var t = date.split(/[:\-\+TZ\. ]/);
        for (var i in t) {
            if (t[i] !== '' && isNaN(parseInt(t[i], 10))) return false;
        }
        
        var d;
        
        if (this.props.utc) {
            d = new Date("Sun Jan 01 00:00:00 UTC 2012");
            d.setUTCFullYear(t[0]);
            d.setUTCMonth(t[1] - 1);
            d.setUTCDate(t[2]);
            d.setUTCHours(t[3]);
            d.setUTCMinutes(t[4]);
            d.setUTCSeconds(t[5]);
            
        } else {
            d = new Date("1/1/1970");
            d.setFullYear(t[0]);
            d.setMonth(t[1] - 1);
            d.setDate(t[2]);
            d.setHours(t[3]);
            d.setMinutes(t[4]);
            d.setSeconds(t[5]);
        }
        
        return d;
    }
    
    
    _formatDate (date) {
        var d = this._parseDate(date);
        
        if (d === false) {
            return 'never';
        }
        
        if (this.props.format == 'ago' || this.props.format == 'future' || this.props.format == "relative" || this.props.since || this.props.until) {
            return this._distanceOfTimeInWords(d, this.props.since || this.props.until || null);
        } else {
            return this._prettyTime(d);
        }
    }
    
    
    render () {
        return React.createElement(
            this.props.component,
            { className: this.props.className, style: this.props.style },
            this._formatDate(this.props.time)
        );
    }
    
}


Timestamp.defaultProps = {
    time: new Date(),
    utc: true,
    format: 'ago',
    since: null,
    until: null,
    includeDay: false,
    component: 'span',
    className: '',
    style: {}
};


module.exports = Timestamp;

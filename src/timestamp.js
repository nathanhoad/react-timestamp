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
    _distanceOfTimeInWords (date) {
        var seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        var is_ago = (seconds >= 0);
        
        seconds = Math.abs(seconds);
        
        var distance;
        var when;
        
        if (seconds < 60) { // 1 minute
            return is_ago ? "Just then" : "Soon";
            
        } else if (seconds < 60 * 60) { // 1 hour
            distance = Math.floor(seconds / 60);
            when = `${distance} ${plural('minute', distance)}`;
            
        } else if (seconds < 60 * 60 * 24) { // 1 day
            distance = Math.floor(seconds / (60 * 60));
            when = `${distance} ${plural('hour', distance)}`;
            
        } else if (seconds < 60 * 60 * 24 * 7) { // 1 week
            distance = Math.floor(seconds / (60 * 60 * 24));
            when = `${distance} ${plural('day', distance)}`;
            
        } else if (seconds < 60 * 60 * 24 * 30) { // 1 month
            distance = Math.floor(seconds / (60 * 60 * 24 * 7));
            when = `${distance} ${plural('week', distance)}`;
            
        } else if (seconds < 60 * 60 * 24 * 30 * 12) { // # 1 year
            distance = Math.floor(seconds / (60 * 60 * 24 * 30));
            when = `${distance} ${plural('month', distance)}`;
            
        } else {
            return this._prettyTime(date);
        }
        
        
        if (is_ago) {
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
        
        var t = date.split(/[:\-TZ\. ]/);
        for (var i in t) {
            if (t[i] !== '' && isNaN(parseInt(t[i], 10))) return false;
        }
        
        var d = new Date("Sun Jan 01 00:00:00 UTC 2012");
        
        d.setUTCFullYear(t[0]);
        d.setUTCMonth(t[1] - 1);
        d.setUTCDate(t[2]);
        d.setUTCHours(t[3]);
        d.setUTCMinutes(t[4]);
        d.setUTCSeconds(t[5]);
        
        if (this.props.offset !== 0) {
            var given_offset = this.props.offset;
            
            if (typeof given_offset === "string") given_offset = parseInt(given_offset, 10);
            
            given_offset = (given_offset / 100 * 60); // Convert from 24 hour time to actual minutes
            var actual_offset = given_offset + d.getTimezoneOffset(); // locale offset is something like -10 * 60 for Australia/Brisbane
            
            d.setUTCMinutes(d.getUTCMinutes() + actual_offset);
        }
        
        return d;
    }
    
    
    _formatDate (date) {
        var d = this._parseDate(date);
        
        if (d === false) {
            return 'never';
        }
        
        if (this.props.format == 'ago' || this.props.format == 'future' || this.props.format == "relative") {
            return this._distanceOfTimeInWords(d);
        } else {
            return this._prettyTime(d);
        }
    }
    
    
    render () {
        return (
            <span className={this.props.className}>
                {this._formatDate(this.props.time)}
            </span>
        );
    }
    
}


Timestamp.defaultProps = {
    time: new Date(),
    format: 'ago',
    includeDay: false,
    offset: 0
};


Timestamp.propTypes = {
    time: React.PropTypes.any,
    format: React.PropTypes.string,
    className: React.PropTypes.any,
    includeDay: React.PropTypes.bool
};


module.exports = Timestamp;

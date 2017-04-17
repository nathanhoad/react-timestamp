# Timestamp

![](https://codeship.com/projects/7a8c81a0-6225-0134-3d52-0627957cda96/status?branch=master)

A React component for displaying a datetime in the local timezone


# Usage

`npm install react-timestamp`

Then:

```javascript
const Timestamp = require('react-timestamp');
```

Use UTC times for the `time` prop.

```html
<Timestamp time={thing.created_at} />
<Timestamp time="2015-10-10 10:30:00" format='full' />
<Timestamp time="2015-10-10 10:30:00" utc={false} format='full' /> <!-- Don't convert the timestamp to local time -->
<Timestamp time="1450663457" />
<Timestamp time="1450663457" format='full' includeDay />
<Timestamp time="1450663457" since="145060000" />
<Timestamp time="1450663457" until="145070000" />
```

Format options are:

 * 'ago' (default) - 2 hours ago
 * 'full' - 10 Oct 2015, 4:32pm
 * 'date' - 10 Oct 2015
 * 'time' - 4:32pm


# Testing

`npm test`

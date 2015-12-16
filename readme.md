# Timestamp

A React component for displaying a datetime in the local timezone


# Usage

`npm install react-timestamp`

Then:

```javascript
import Timestamp from 'react-timestamp';
```

Use UTC times for the `time` prop.

```html
<Timestamp time={thing.created_at} />
<Timestamp time="2015-10-10 10:30:00" format='short' />
```


# Testing

`npm test`
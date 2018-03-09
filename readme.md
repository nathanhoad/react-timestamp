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
<Timestamp time={thing.created_at} twentyFourHour />
<Timestamp time={thing.created_at} actualSeconds /> <!-- Shows actual seconds instead of 'a few seconds ago' -->
<Timestamp time={thing.created_at} precision={2} />
<Timestamp time="2015-10-10 10:30:00" format='full' />
<Timestamp time="2015-10-10 10:30:00" utc={false} format='full' /> <!-- Don't convert the timestamp to local time -->
<Timestamp time="1450663457" />
<Timestamp time="1450663457" format='full' includeDay />
<Timestamp time="1450663457" since="145060000" />
<Timestamp time="1450663457" until="145070000" />
<Timestamp time="1450663457" until="145070000" autoUpdate /> <!-- Updates every second -->
<Timestamp time="1450663457" until="145070000" autoUpdate={60} /> <!-- Updates every minute -->
```

Format options are:

 * 'ago' (default) - 2 hours ago
 * 'full' - 10 Oct 2015, 4:32pm
 * 'date' - 10 Oct 2015
 * 'time' - 4:32pm

Precision works like this:

```html
<Timestamp time={SOME DATE} precision={3} />
<!-- 2 days, 4 hours, 1 minute ago -->

<Timestamp time={SOME DATE} precision={2} />
<!-- 2 days, 4 hours -->

<Timestamp time={SOME DATE} precision={1} />
<!-- 2 days -->
```


## Usage with React Native

If you are using React Native then you'll have to pass in `Text`.

```javascript
import Timestamp from 'react-timestamp';
import { Text } from 'react-native';
```

Then:

```html
<Timestamp time="1450663457" component={Text} />
```

# Testing

`npm test`

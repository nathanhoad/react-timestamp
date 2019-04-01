# React Timestamp

Render a nice looking time.

## Usage

If you only provide a date then it will just format it nicely:

```jsx
<Timestamp date={Date} /> // 26 Mar 2018, 10:30am
```

If you enable `relative` then you'll get something like:

```jsx
<Timestamp relative date={Date} /> // 4 hours ago
<Timestamp relative date={Date} /> // in 4 hours
<Timestamp relative date={Date} relativeTo={Date} /> // 4 hours
<Timestamp relative date={Date} relativeTo={Date} /> // 2 years

<Timestamp relative date={Date} autoUpdate /> // 1 minute ago, 2 minutes ago, 3 minutes ago
```

Other options are set by passing an `options` prop:

```jsx
<Timestamp date={Date} options={{ includeDay: true, twentyFourHour: true }} /> // Tuesday, 26 Mar 2018, 16:30
```

## Authors

- Nathan Hoad - [nathan@nathanhoad.net](mailto:nathan@nathanhoad.net)

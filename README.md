## rn-table

### Intro
rn-table is a flexible and intuitive way to wrap data like `<table>` does in HTML.

### Usage example

```js
import Table from "./Table";
import dataWrapping from "./dataWrapping";

const App = () => {
  const [tableData, setTableData] = useState([
    {
      id: 1,
      Name: "Cristi",
      Age: 18,
      Address: "Pee Pee Island",
      Crimes: 69,
    },
    {
      id: 2,
      Name: "Kate",
      Age: 19,
      Address: "Freddy Fazbear Pizza",
      Crimes: 69,
    },
    {
      id: 3,
      Name: "Aura",
      Age: 19,
      Address: "Freddy Fazbear Pizza",
      Crimes: 69,
    },
    {
      id: 4,
      Name: "Devin",
      Age: 19,
      Address: "Freddy Fazbear Pizza",
      Crimes: 69,
    },
    {
      id: 5,
      Name: "Michael",
      Age: 19,
      Address: "Freddy Fazbear Pizza",
      Crimes: 69,
    },
  ]);

  const [selected, setSelected] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {

  }, [toggle]);

  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
      <Table
        data={tableData}
        dataWrapper={dataWrapping}
        fitWidth={false}
        uniqueKey={'id'}
        onCheck={selected => {
          setSelected(selected);
          setToggle(!toggle);
        }}
      />

      <View style={{
        flexDirection: 'column'
      }}>
        <Text>Selected:</Text>
        {selected.map(item => (
          <Text>{item}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
};
```

### Preview

<table cellpadding="0">
  <tr style="padding: 0">
    <tr>
      <th>fitWidth: false</th>
      <th>fitWidth: true</th>
     </tr>
    <td valign="top"><img src="https://github.com/florinchristian/rn-table/blob/master/preview-1.gif" width="300"></td>
    <td valign="top"><img src="https://github.com/florinchristian/rn-table/blob/master/preview-2.png" width="300"></td>
  </tr>
</table>

### Mandatory props
- `data`
  - Data model:
  ```js
    // Note that the identifier of each field will appear exactly the same in the table header
    {
      uniqueKey: 1,
      Field1: "Cristi",
      Field2: 18,
      Field3: "Pee Pee Island",
      Field4: 69
    }
  ```
- `dataWrapper`
  - Data wrapper model:
  ```js
    // Note 1: cellWidth & component properties are mandatory
    // Note 2: cellWidth assures the styling of the table; component tells
    //  the table what component to render for each table field and its data
    // Note 3: each field must be the same as the fields in the data model
    const dataWrapping = {
    "Field1": {
      cellWidth: 100,
      component: (item) => (
        <Text style={{
          color: 'black'
        }}>{item}</Text>
      )
    },
    "Field2": {
      cellWidth: 100,
      component: (item) => (
        <Text style={{
          color: 'black'
        }}>{item}</Text>
      )
    },
    "Field3": {
      cellWidth: 150,
      component: (item) => (
        <Text style={{
          color: 'black'
        }}>{item}</Text>
      )
    },
    "Field4": {
      cellWidth: 150,
      component: (item) => (
        <Text style={{
          color: 'black'
        }}>{item}</Text>
      )
    },
  };
  ```
- `uniqueKey`
  - `uniqueKey` is the exact path to the property in the data model that identifies the object.
  For instance:
  ```js
  // the uniqueKey for the data model below is 'id'
  {
      id: 1,
      Name: "Cristi",
      Age: 18,
      Address: "Pee Pee Island",
      Crimes: 69,
  }
  ```
- `onCheck`
  - `onCheck` is the method called every time an item is selected.
  ```js
  onCheck={selected => {
    // selected is an array of the selected items (their unique keys)
  }}
  ```
  
### The `fitWidth` prop
This prop tells the table whether to fit the device's width or to enlarge as much as needed.

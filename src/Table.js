import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const WIDTH = Dimensions.get('screen').width;

const CheckBox = ({ value, onValueChange }) => {
  const updateValue = () => {
    onValueChange(!value);
  };

  return (
    <TouchableOpacity onPress={updateValue} style={{
      width: 20,
      height: 20,
      borderWidth: value ? null : 2,
      borderColor: value ? null : 'gray',
      borderRadius: 3,
      backgroundColor: value ? '#009988' : null,
    }}>
      {value &&
        <View style={{
          width: 2,
          height: 7,
          backgroundColor: 'white',
          transform: [{ rotateZ: '-45deg' }],
          position: 'absolute',
          bottom: 5,
          left: 6
        }}></View>
      }

      {value &&
        <View style={{
          width: 2,
          height: 10,
          backgroundColor: 'white',
          transform: [{ rotateZ: '40deg' }],
          position: 'absolute',
          bottom: 5,
          right: 7
        }}></View>
      }
    </TouchableOpacity>
  );
};

const Header = ({
  columns,
  allChecked,
  setAllChecked,
  fitWidth,
  dataWrapper,
  style
}) => {
  return (
    <View style={[{
      flexDirection: 'row',
      height: 50,
      width: fitWidth ? WIDTH : 'auto'
    }, style]}>
      <View style={{
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CheckBox
          value={allChecked}
          onValueChange={value => setAllChecked(value)}
        />
      </View>

      {columns.map(column => (
        <View style={{
          width: !fitWidth ? dataWrapper[column].cellWidth : null,
          flex: fitWidth ? 1 : null,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            color: 'black'
          }}>{column}</Text>
        </View>
      ))}
    </View>
  );
};

const Row = ({
  uniqueKey,
  isSelected,
  content,
  setIsSelected,
  fitWidth,
  dataWrapper,
  style
}) => {
  return (
    <View style={[{
      flexDirection: 'row',
      height: 50,
      width: fitWidth ? WIDTH : 'auto',
    }, style]}>
      <View style={{
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CheckBox
          value={isSelected}
          onValueChange={value => setIsSelected(value)}
        />
      </View>

      {Object.entries(content).map(([key, value]) => {
        if (key !== uniqueKey)
          return (
            <View style={{
              width: fitWidth ? null : dataWrapper[key].cellWidth,
              flex: fitWidth ? 1 : null,
              justifyContent: 'center',
              alignItems: 'center'
            }}>{dataWrapper[key].component(value, fitWidth)}</View>
          );
      })}
    </View>
  );
};

const Table = ({
  data,
  fitWidth,
  uniqueKey,
  dataWrapper,
  onCheck,
  headerStyle,
  oddRowStyle,
  evenRowStyle,
  containerStyle
}) => {
  const [tableColumns, setTableColumns] = useState([]);

  const [allChecked, setAllChecked] = useState(false);
  const [checked, setChecked] = useState([]);

  const [toggle, setToggle] = useState(false);

  const init = () => {
    let columns = [];

    for (let key in data[0])
      if (key !== uniqueKey)
        columns.push(key);

    setTableColumns(columns);
  }

  useEffect(() => {
    init();
  }, [toggle]);

  return (
    <ScrollView
      horizontal={true}
      style={[{
        flexGrow: 0,
        height: 'auto'
      }, containerStyle]}
    >
      <View>
        <Header
          style={headerStyle}
          columns={tableColumns}
          allChecked={allChecked}
          setAllChecked={(allChecked) => {
            let newChecked = [];

            if (allChecked)
              for (let i in data)
                newChecked.push(data[i][uniqueKey]);

            setAllChecked(allChecked);

            setChecked(newChecked);
            onCheck(newChecked);
          }}
          fitWidth={fitWidth}
          dataWrapper={dataWrapper}
        />

        {data.map((row, index) => (
          <Row
            key={row[uniqueKey]}
            style={(index + 1) % 2 == 0 ? evenRowStyle : oddRowStyle}
            fitWidth={fitWidth}
            uniqueKey={uniqueKey}
            content={row}
            dataWrapper={dataWrapper}
            isSelected={checked.includes(row[uniqueKey]) === true || allChecked}
            setIsSelected={(isSelected) => {
              let newDict = checked;

              if (isSelected && !newDict.includes(row[uniqueKey]))
                newDict.push(row[uniqueKey]);
              else if (!isSelected && newDict.includes(row[uniqueKey])) {
                let it = newDict.indexOf(row[uniqueKey]);
                delete newDict[it];

                newDict = newDict.filter(item => item !== undefined);
              }

              setChecked(newDict);

              onCheck(newDict);

              setToggle(!toggle);
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Table;

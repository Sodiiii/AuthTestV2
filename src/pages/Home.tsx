import type { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import React, { useContext, useEffect, useRef, useState } from 'react';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: number;
  phone: number;
  post: number;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  phone: number;
  post: number;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const App: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: "1",
      name: "Петр Иванов",
      phone: 8909111111,
      post: 644000,
      age: 45,
    },
    {
      key: "2",
      name: "Дмитрий Зайцев",
      phone: 8909222222,
      post: 650011,
      age: 50,
    },
    {
      key: "3",
      name: "Владимир Пешкин",
      phone: 8909333333,
      post: 650011,
      age: 35,
    },
    {
      key: "4",
      name: "Зенитсу Агатсума",
      phone: 8909444444,
      post: 650013,
      age: 15,
    },
    {
      key: "5",
      name: "Степан Разин",
      phone: 8909555555,
      post: 650012,
      age: 60,
    },
    {
      key: "6",
      name: "Иван Калинин",
      phone: 8909666666,
      post: 650012,
      age: 77,
    },
    {
      key: "7",
      name: "Юлия Волкова",
      phone: 8909777777,
      post: 650014,
      age: 28,
    },
    {
      key: "8",
      name: "Евгений Понасенов",
      phone: 8909888888,
      post: 650015,
      age: 53,
    },
    {
      key: "9",
      name: "Кира Самойлова",
      phone: 8909999999,
      post: 650016,
      age: 33,
    },
    {
      key: "10",
      name: "Тенген Удзуй",
      phone: 8909000065,
      post: 650017,
      age: 21,
    },
    {
      key: "11",
      name: "Джордж Буш",
      phone: 8909000051,
      post: 650018,
      age: 74,
    },
    {
      key: "12",
      name: "Эмануэль Макрон",
      phone: 8909000032,
      post: 650019,
      age: 53,
    },
    {
      key: "13",
      name: "Мирон Янович",
      phone: 890900021,
      post: 650020,
      age: 31,
    },
  ]);

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter(item => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Имя',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'Возраст',
      dataIndex: 'age',
      width: '30%',
      editable: true,
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      width: '30%',
      editable: true,
    },
    {
      title: 'Индекс',
      dataIndex: 'post',
      width: '30%',
      editable: true,
    },
    {
      title: 'Действие',
      dataIndex: 'operation',
      
      render: (_, record: any) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      name: `Новый Пользователь ${count}`,
      age: 32,
      phone: 89994442555,
      post: 78899 ,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Добавить пользователя
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default App;
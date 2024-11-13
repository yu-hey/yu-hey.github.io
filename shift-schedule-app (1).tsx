import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Home, Bath, Hospital, User } from 'lucide-react';

const ShiftSchedule = () => {
  const [schedule, setSchedule] = useState({
    dates: [],
    shifts: {}
  });

  // 施設・サービスの定義
  const services = [
    {
      name: 'あいアイ館',
      icon: <Home className="h-4 w-4" />,
      shifts: ['8:30～', '12:45～', '15:30～']
    },
    {
      name: '入浴サービス',
      icon: <Bath className="h-4 w-4" />,
      shifts: ['午前', '午後']
    },
    {
      name: 'のぞみ寮',
      icon: <Home className="h-4 w-4" />,
      shifts: ['8:30～', '12:45～', '15:30～']
    },
    {
      name: '通院同行',
      icon: <Hospital className="h-4 w-4" />,
      shifts: ['終日']
    }
  ];

  // 1ヶ月分の日付を生成
  useEffect(() => {
    const generateDates = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      
      const dates = [];
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        dates.push({
          date: i,
          dayOfWeek: new Intl.DateTimeFormat('ja-JP', { weekday: 'short' }).format(date)
        });
      }
      setSchedule(prev => ({ ...prev, dates }));
    };
    generateDates();
  }, []);

  const getBackgroundColor = (dayOfWeek) => {
    if (dayOfWeek === '土') return 'bg-blue-50';
    if (dayOfWeek === '日') return 'bg-red-50';
    return '';
  };

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="bg-gray-50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            シフトスケジュール
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              同期中
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border p-2 bg-gray-50">日付</th>
                <th className="border p-2 bg-gray-50">曜日</th>
                <th className="border p-2 bg-gray-50">
                  <div className="flex items-center gap-1 justify-center">
                    <User className="h-4 w-4" />
                    利用者名
                  </div>
                </th>
                {services.map(service => (
                  <th key={service.name} className="border p-2 bg-gray-50">
                    <div className="flex items-center gap-1 justify-center">
                      {service.icon}
                      {service.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.dates.map(({ date, dayOfWeek }) => (
                <tr key={date} className={getBackgroundColor(dayOfWeek)}>
                  <td className="border p-2 text-center">{date}</td>
                  <td className="border p-2 text-center font-medium">
                    <span className={
                      dayOfWeek === '日' ? 'text-red-600' :
                      dayOfWeek === '土' ? 'text-blue-600' : ''
                    }>
                      {dayOfWeek}
                    </span>
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      className="w-full p-1 text-sm rounded border border-gray-300"
                      placeholder="利用者名を入力"
                      onChange={(e) => {
                        console.log(`${date}日の利用者を${e.target.value}に更新`);
                      }}
                    />
                  </td>
                  {services.map(service => (
                    <td key={`${date}-${service.name}`} className="border p-2">
                      <div className="flex flex-col gap-1">
                        {service.shifts.map(shift => (
                          <input
                            key={`${date}-${service.name}-${shift}`}
                            type="text"
                            className="w-full p-1 text-sm rounded border border-gray-300"
                            placeholder={shift}
                            onChange={(e) => {
                              console.log(`${date}日の${service.name}の${shift}を${e.target.value}に更新`);
                            }}
                          />
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShiftSchedule;

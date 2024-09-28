import React from 'react';
import { AiOutlineWifi } from 'react-icons/ai';
import { BsBatteryFull } from 'react-icons/bs';
import { MdSignalCellular4Bar } from 'react-icons/md';

const teamImages = {
  Chelsea: 'https://th.bing.com/th/id/OIP.QLQFHt5jpuA-GW4DKYhZ_QHaGb?rs=1&pid=ImgDetMain',
  Liverpool: 'https://th.bing.com/th/id/OIP.jNLHEK_4Hav4l4Keu44XNgHaHa?rs=1&pid=ImgDetMain',
  Burnley: 'https://th.bing.com/th/id/OIP._eDXii1Tc8EEHBvhSb5uXgHaF_?rs=1&pid=ImgDetMain',
  Fulham: 'https://th.bing.com/th/id/OIP.TWc806sAUiJiyRZOthra8AHaFj?rs=1&pid=ImgDetMain',
  Brighton: 'https://th.bing.com/th/id/OIP.vVnluU9VPr4fIV3Au2HOVwHaGB?rs=1&pid=ImgDetMain',
  Arsenal: 'https://th.bing.com/th/id/OIP.Nh0gVXiMmWlc2CUgARoYMAHaFj?rs=1&pid=ImgDetMain',
};

export default function MatchList() {
  const matches = [
    {
      homeTeam: 'Chelsea',
      awayTeam: 'Liverpool',
      score: '3:1',
    },
    {
      homeTeam: 'Burnley',
      awayTeam: 'Fulham',
      score: '0:1',
    },
    {
      homeTeam: 'Brighton',
      awayTeam: 'Arsenal',
      score: '0:2',
    },
  ];

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="bg-blue-600 px-2 py-1 border rounded-[25px] h-[75vh] max-w-lg mx-auto">
        <div className="flex justify-between items-center w-full px-2">
          <div className="text-white">11:40</div>

          <div className="flex items-center space-x-2">
            <MdSignalCellular4Bar size={18} color="white" />
            <AiOutlineWifi size={18} color="white" />
            <BsBatteryFull size={18} color="white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold my-10 text-white">Premier League</h2>
        <h3 className="text-white font-bold mb-2">Partidos</h3>
        <div className="space-y-6">
          {matches.map((match, index) => (
            <div
              key={index}
              className="bg-white opacity-95 text-black px-2 py-7 rounded-xl flex justify-around items-center shadow-lg space-x-6"
            >
              <div className="flex items-center">
                <img
                  src={teamImages[match.homeTeam]}
                  alt={`${match.homeTeam} logo`}
                  className="w-9 rounded-full object-cover"
                />
                <p className="">{match.homeTeam}</p>
              </div>

              <div className="text-center">
                <p className="font-bold">{match.score}</p>
              </div>

              <div className="flex items-center">
                <p className="">{match.awayTeam}</p>
                <img
                  src={teamImages[match.awayTeam]}
                  alt={`${match.awayTeam} logo`}
                  className="w-9 rounded-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";

interface ActivityContextValue {
  // define the shape of your activity data here
  activities: string[];
  setActivities: (activities: string[]) => void;
}

const ActivityContext = React.createContext<ActivityContextValue | undefined>(
  undefined
);

type ActivityProviderProps = {
  children: React.ReactNode;
};

export const ActivityProvider: React.FC<ActivityProviderProps> = ({
  children,
}) => {
  // use Firebase to fetch and manage activity data here
  const [activities, setActivities] = useState<string[]>([]);

  return (
    <ActivityContext.Provider value={{ activities, setActivities }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => {
  const context = React.useContext(ActivityContext);
  if (!context) {
    throw new Error("useActivity must be used within an ActivityProvider");
  }
  return context;
};

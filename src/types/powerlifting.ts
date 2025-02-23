type PowerliftingRecord = {
    Name: string;
    Sex: "M" | "F";
    Event: string;
    Equipment: string;
    Age: number | null;
    Division: string;
    BodyweightKg: number | null;
    WeightClassKg: string;
    Squat1Kg: number | null;
    Squat2Kg: number | null;
    Squat3Kg: number | null;
    Bench1Kg: number | null;
    Bench2Kg: number | null;
    Bench3Kg: number | null;
    Deadlift1Kg: number | null;
    Deadlift2Kg: number | null;
    Deadlift3Kg: number | null;
    TotalKg: number | null;
    Place: string | null;
    Dots: number | null;
    Wilks: number | null;
    Glossbrenner: number | null;
    Goodlift: number | null;
    Tested: boolean;
    MeetCountry: string;
    MeetState: string | null;
    MeetName: string;
    Federation: string;
    Date: string; // Format: YYYY-MM-DD
    Sanctioned: boolean;
};

type ProcessedPowerliftingRecord = PowerliftingRecord & {
  Rank: number,
  SquatKg: number | string;
  BenchKg: number | string;
  DeadliftKg: number | string;
};

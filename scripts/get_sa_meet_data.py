import pandas as pd

FILE_PATH: str = "~/Downloads/powerlifting.csv"


if __name__ == "__main__":
    df = pd.read_csv(FILE_PATH)
    df = df[(df["MeetCountry"] == "Australia") & (df["MeetState"] == "SA")]
    df = df[
        [
            "Name",
            "Sex",
            "Event",
            "Equipment",
            "Age",
            "Division",
            "BodyweightKg",
            "WeightClassKg",
            "Squat1Kg",
            "Squat2Kg",
            "Squat3Kg",
            "Bench1Kg",
            "Bench2Kg",
            "Bench3Kg",
            "Deadlift1Kg",
            "Deadlift2Kg",
            "Deadlift3Kg",
            "TotalKg",
            "Place",
            "Dots",
            "Wilks",
            "Glossbrenner",
            "Goodlift",
            "Tested",
            "MeetCountry",
            "MeetState",
            "MeetName",
            "Federation",
            "Date",
            "Sanctioned",
        ]
    ]
    print(df)
    df.to_csv("../data/sa_powerlifting.csv", index=False)

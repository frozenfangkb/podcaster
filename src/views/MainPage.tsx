import React, { useEffect, useMemo, useState } from "react";
import { Entry } from "../models/ITunesResponse";
import { PodcastCard } from "../components/PodcastCard";
import { selectEntries } from "../store/slices/podcastSlice";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { loadEntries } from "../services/entries/entries.service";

export const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const entries = useAppSelector(selectEntries);
  const [filterValue, setFilterValue] = useState<string>("");
  const filteredEntries = useMemo<Entry[]>(() => {
    if (filterValue !== "") {
      return entries.filter(
        (entry) =>
          entry["im:name"].label
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          entry["im:artist"].label
            .toLowerCase()
            .includes(filterValue.toLowerCase())
      );
    }
    return entries;
  }, [filterValue, entries]);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    if (entries.length === 0) {
      await loadEntries();
    }
  };

  return (
    <div>
      <div className="mainContainer">
        <div className="flex justify-end items-center gap-4">
          <span className="chipCounter">{filteredEntries.length}</span>
          <input
            className="w-96"
            type="text"
            placeholder="Filter podcasts..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 gap-x-4 gap-y-32">
          {filteredEntries.map((entry: Entry) => (
            <div
              key={entry.id.attributes["im:id"]}
              onClick={() =>
                navigate(`podcast/${entry.id.attributes["im:id"]}`)
              }
            >
              <PodcastCard
                title={entry["im:name"].label}
                author={entry["im:artist"].label}
                image={entry["im:image"][2].label ?? ""}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

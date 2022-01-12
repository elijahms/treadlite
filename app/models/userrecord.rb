class Userrecord < ApplicationRecord

    def intialize(miles_per_gallon, miles_per_week)
        @miles = miles_per_gallon
        @week = miles_per_week
    end

    def calc_score
        weekly_co_em = self.miles_per_week * self.miles_per_gallon
        ## zi = (xi – min(x)) / (max(x) – min(x)) * 100
        score = (weekly_co_em - 0.35) / (48 - 0.35) * 100
        self.score = score
    end
end

class Userrecord < ApplicationRecord

    def calc_score
        weekly_co_em = self.miles_per_week / self.miles_per_gallon
        ## zi = (xi – min(x)) / (max(x) – min(x)) * 100
        score = (weekly_co_em - 0.35) / (48 - 0.35) * 100
        self.score = score
        self.save
    end

    def self.order_by_score(user)
        curr_user = Userrecord.find_by(user_id: user.id )
        # binding.pry
        orderedrecords = self.all.order(:score)
        # binding.pry
        index = orderedrecords.pluck(:user_id).index(curr_user.id)
        index
    end
end



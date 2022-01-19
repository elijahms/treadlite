class Userrecord < ApplicationRecord

    def calc_score
        weekly_co_em = self.miles_per_week / self.miles_per_gallon
        ## zi = (xi – min(x)) / (max(x) – min(x)) * 100
        score = 100 - ((weekly_co_em - 0.35) / (48 - 0.35) * 100)
        self.score = score
        self.save
    end

    # def self.order_by_score(user)
    #     curr_user = Userrecord.find_by(user_id: user.id )
    #     orderedrecords = self.all.order(:score)
    #     index = orderedrecords.pluck(:user_id).index(curr_user.id)
    #     index
    # end

    def calc_update_permission
        today = Time.new
        last_update = self.trend_update
        difference = (today - last_update) / 3600
        if difference >= 168
            true
        else
            false
        end
    end
end


